'use strict';
// "use strict"; 是一种JavaScript的编程指令，它是ECMAScript 5（ES5）引入的严格模式（strict mode）。

import { CONFIG } from './config.js';
import { LyricsManager } from './LyricsManager.js';
import { addEventListeners, timeFormatSecondsToMinutes } from './utils.js';
import { getMusicList, MusicStorage, FILE_MUSIC_ROOT } from './musicList.js';



const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// 创建实例
const lyricsManager = new LyricsManager();
lyricsManager.setTimeUpdateCallback((time) => {
  if (audioSource) {
    audioSource.currentTime = time;
  }
});

const currentMusicList = MusicStorage.getListAllMusic();

// 当前音乐列表序号
let currentMusicIndex = 0
// 音频 对象
const initAudioSource = () => {
  const audio = new Audio();
  audio.preload = 'metadata'; // 添加预加载设置
  audio.volume = CONFIG.VOLUME.DEFAULT;
  return audio;
}
const audioSource = initAudioSource();
const audioUrl = FILE_MUSIC_ROOT + currentMusicList[currentMusicIndex].type_path + currentMusicList[currentMusicIndex].name_path;
audioSource.src = audioUrl;


// updatePlayInfo() - 修改 播放信息
const currentPlayImg70 = $$('[currentPlay-img70]')
const currentPlayImg400 = Array.from($$('[currentPlay-img400]'))
const currentPlayName = $$('[currentPlay-name]')
const currentPlayAuthor = $$('[currentPlay-author]')
const PlayElements = [currentPlayImg70, currentPlayImg400, currentPlayName, currentPlayAuthor]

// updateRange() - 更新 进度条max 和 音乐总时长
const playTotalTime = $$("[play-totalTime]");
const playProgress = $$("[play-Progress]");

// updateRunningTime() - 播放音乐时更新时间
const playCurrentTime = $$("[play-currentTime")

// updateRangeColor() - 更新进度条 颜色范围
const playcolorFill = $$("[play-colorFill]")

// playMusic() - 播放|暂停 音乐
let playInterval
// 单位 ms
const updateIntervalTime = CONFIG.UPDATE_INTERVAL
const playBtns = $$("[play-btn]")
const playImgBorad = $('[play-imgBorad]')

// playSkipNext() - 跳过 下一首
const playNextBtns = $$("[play-next-btn]")

// playSkipPrev() - 跳过 上一首
const playPrevBtns = $$("[play-prev-btn]")

// isPlayMode() - 设置播放方式
let playMode = 0

//【列表循环，随机播放，单曲循环】
const AllplayMode = [0, 1, 2]
const playModeBtn = $("[play-mode]")
// shuffle() - 当前列表 设置随机播放
let isShuffle = false

// changeVolume() - 修改音量
const playVolumeRange = $("[play-volume-range]")
const playVolumeColorFill = $("[play-volume-colorFill]")

// muteVolume() - 设置静音
const playVolumeIcon = $("[play-volume-icon]")

const imgBoard = $('.imgBoard')
const songPanel = $('[song-panel]')


// initMusicList() - 初始化列表歌曲
let contentList = $('[content-list]')


/**
 * 播放工具
 */
const playingTool = async function () {
  try {
    updatePlayInfo();
    await playMusic();

  } catch (error) {
    console.error('播放失败:', error);
    alert(`播放失败: ${error.message}\n请检查音频文件是否存在或已损坏`);
  }
};



// ---------------------------------------播放进度和歌词显示部分 start------------------------------------------------------------------------------------



/**
 * 显示|隐藏 歌词面板
 */
const togglePanel = function (e) {
  // 阻止事件冒泡
  e.stopPropagation();
  console.log('togglePanel called'); // 调试日志

  if (document.fullscreenElement) {
    //全屏状态，先退出全屏，再隐藏歌词面板
    exitFullscreen();
  }

  // 确保元素存在
  if (!imgBoard || !songPanel) {
    console.error('找不到必要的 DOM 元素');
    return;
  }

  // 切换状态
  imgBoard.classList.toggle('active');
  songPanel.classList.toggle('active');

}
// 事件绑定
$('#fullscreen-btn')?.addEventListener('click', toggleFullscreen);
$('#close-panel-btn')?.addEventListener('click', togglePanel);
$('#app-footer')?.addEventListener('click', togglePanel);

// 防止面板内部点击关闭
$('.song_panel')?.addEventListener('click', e => e.stopPropagation());

function toggleFullscreen(e) {
  e.stopPropagation(); // 阻止事件冒泡
  console.log('toggleFullscreen called');

  const songPanel = $('.song_panel');
  if (!songPanel) return;

  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen(songPanel);
  }
}

function enterFullscreen() {
  if (songPanel.requestFullscreen) {
    songPanel.requestFullscreen();
  } else if (songPanel.mozRequestFullScreen) {
    songPanel.mozRequestFullScreen();
  } else if (songPanel.webkitRequestFullscreen) {
    songPanel.webkitRequestFullscreen();
  } else if (songPanel.msRequestFullscreen) {
    songPanel.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}



/** 
 * updateRange()
 * 修改 进度条 max
 * 修改 音乐总时间（从音频获取总长）
 */
const updateRange = function () {
  for (let i = 0; i < playProgress.length; i++) {
    playProgress[i].max = Math.ceil(audioSource.duration)
    playTotalTime[i].textContent = timeFormatSecondsToMinutes(Number(playProgress[i].max))
  }
}
audioSource.addEventListener("loadeddata", updateRange);


/** 
 * updateRunningTime()
 * 播放音乐时更新时间(当前播放进度时间) 
 * 
 */
const updateRunningTime = function () {
  for (let i = 0; i < playProgress.length; i++) {
    // 当前播放秒 = 进度条 value
    playProgress[i].value = audioSource.currentTime
    playCurrentTime[i].textContent = timeFormatSecondsToMinutes(audioSource.currentTime)
  }

  // 改变 进度条颜色范围
  updateRangeColor()
  musicPlayEnd()
}



/**
 * updateRangeColor()
 * 更新进度条 填充颜色
 */
const updateRangeColor = function (e) {
  let element = playProgress[0]
  if (typeof (e) != "undefined") {
    element = e.target
  }

  // 填充颜色 百分值
  const rangeValue = (element.value / element.max) * 100

  for (let i = 0; i < playcolorFill.length; i++) {
    playcolorFill[i].style.width = `${rangeValue}%`
    if (rangeValue < CONFIG.TRANSITION.INTERVAL) {
      element.value = element.value - 1
    }
    playProgress[i].value = element.value
  }
}


addEventListeners(playProgress, {
  'input': updateRangeColor,
  'click': (e) => e.stopPropagation()
})

/**
 * updatePlaytime()
 * 更新进度条值
 * 更新 音乐播放|当前播放时间
 *  
 */
const updatePlaytime = function (e) {
  e.stopPropagation()

  // 进度条 value = 音乐 currentTime
  audioSource.currentTime = e.target.value
  for (let i = 0; i < playProgress.length; i++) {
    playCurrentTime[i].textContent = timeFormatSecondsToMinutes(e.target.value)
  }

  // 更新计时器 + 滚动歌词
  // 更新歌词显示
  if (lyricsManager) {
    // 清除旧的歌词状态
    lyricsManager.clear();
    // 立即更新到当前时间点的歌词
    lyricsManager.update(audioSource.currentTime);
  }
}

addEventListeners(playProgress, {
  'input': updatePlaytime,
  'change': updatePlaytime, // 添加 change 事件处理
  'click': (e) => e.stopPropagation()
})



/**
 * musicPlayEnd()
 * 音乐播放结束
 */
const musicPlayEnd = function () {
  if (audioSource.ended) {
    playBtns.forEach((playBtn) => {
      playBtn.classList.remove("playing")
      playBtn.classList.add("pause")
    })
    // 随机播放 列表循环 
    if (playMode == 0 || playMode == 1) {
      // playSkipNext()
      // 获取具有 "next" id 属性的元素
      const btn = document.getElementById("btn-next");
      // 创建一个新的点击事件
      const clickEvent = new Event("click");
      // 触发点击事件
      btn.dispatchEvent(clickEvent);

    }
  }
}


// ---------------------------------------播放进度和歌词显示部分 end------------------------------------------------------------------------------------


/** 
 * updatePlayInfo()
 * 设置 修改 播放面板信息
 * const PlayElements = [currentPlayImg70,currentPlayImg400, currentPlayName, currentPlayAuthor]
 */
const updatePlayInfo = function () {
  for (let index in PlayElements) {
    PlayElements[index].forEach((ele) => {
      if (index <= 1) {
        ele.src = currentMusicList[currentMusicIndex].imgPath
        ele.alt = '...'
      } else if (index == 2) {
        ele.textContent = currentMusicList[currentMusicIndex].title
        ele.title = currentMusicList[currentMusicIndex].title
      } else {
        ele.textContent = currentMusicList[currentMusicIndex].author
        ele.title = currentMusicList[currentMusicIndex].author
      }
    })
  }
  audioSource.src = FILE_MUSIC_ROOT + currentMusicList[currentMusicIndex].type_path + currentMusicList[currentMusicIndex].name_path;
  // 更新歌词 - 确保在切换歌曲时重新加载歌词
  if (lyricsManager) {
    lyricsManager.clear(); // 先清除现有歌词
    lyricsManager.loadLyrics(currentMusicList[currentMusicIndex]);
  }

}

// 修改歌词点击回调的设置
lyricsManager.setTimeUpdateCallback((time) => {
  if (audioSource) {
    audioSource.currentTime = time;
    // 立即更新歌词显示
    lyricsManager.update(time);
  }
});
/**
 * 控制 播放|暂停 音乐
 */
const playMusic = async function (e) {
  console.log("playMusic 开始播放音乐 ");

  if (e) e.stopPropagation()

  // audioSource.addEventListener("loadeddata", updateRange)

  try {
    if (audioSource.paused) {
      // 播放音乐
      await audioSource.play();
      // 更新UI
      startPlayback();
    } else {
      // 暂停音乐
      stopPlayback();
    }
  } catch (error) {
    console.error('播放失败:', error);
    throw error; // 向上传递错误
  }

}
addEventListeners(playBtns, {
  'click': playMusic,
  'dblclick': (e) => e.stopPropagation()
});

function startPlayback() {
  updateUIForPlaying();
  // 清除可能存在的旧计时器
  if (playInterval) {
    clearInterval(playInterval);
  }

  // 启动新的计时器
  playInterval = setInterval(() => {
    // 更新播放进度和时间显示
    updateRunningTime();

    // 更新歌词显示 - 确保每次都调用歌词更新
    if (lyricsManager && !audioSource.paused) {
      lyricsManager.update(audioSource.currentTime);
    }
  }, updateIntervalTime);
}

function stopPlayback() {
  audioSource.pause();
  updateUIForPaused();
  // 清除计时器
  clearInterval(playInterval);
  lyricsManager.clear();
}
/**
 * 更新UI为播放状态
 */
function updateUIForPlaying() {
  // 更新播放按钮状态
  playBtns.forEach((btn) => {
    btn.classList.add("playing");
    btn.classList.remove("pause");
  });

  // 更新专辑图片旋转动画
  playImgBorad.classList.add('active');

  // 更新列表选中状态
  Array.from(contentList.children).forEach((item, index) => {
    item.classList.toggle('active', index === currentMusicIndex);
  });
}

/**
 * 更新UI为暂停状态
 */
function updateUIForPaused() {
  // 更新播放按钮状态
  playBtns.forEach((btn) => {
    btn.classList.add("pause");
    btn.classList.remove("playing");
  });

  // 更新专辑图片旋转动画
  playImgBorad.classList.remove('active');

}

/**
 * playSkipNext()
 * 跳过 下一首
 */

const playSkipNext = function (e) {
  console.log("playSkipNext == 下一首");
  e.stopPropagation()
  //  lastPlayedMusic = currentMusic;
  // 是否 随机
  if (isShuffle) {
    shuffleMusic()
  } else {
    // 是否超出 播放列表数
    currentMusicIndex >= currentMusicList.length - 1 ? currentMusicIndex = 0 : currentMusicIndex++
  }
  playingTool()
}

addEventListeners(playNextBtns, {
  'click': playSkipNext,
  'dblclick': (e) => e.stopPropagation()
})


/**
 * playSkipPrev()
 * 跳过 上一首
 */
const playSkipPrev = function (e) {
  console.log("playSkipPrev == 上一首");
  e.stopPropagation()
  if (isShuffle) {
    shuffleMusic()
  } else {
    currentMusicIndex <= 0 ? currentMusicIndex = currentMusicList.length - 1 : currentMusicIndex--
  }

  playingTool()
}

addEventListeners(playPrevBtns, {
  'click': playSkipPrev,
  'dblclick': (e) => e.stopPropagation()
})

/**
 * shuffle()
 * 当前列表 随机播放
 */
const getRandomMusic = () => Math.floor(Math.random() * currentMusicList.length)
const shuffleMusic = () => currentMusicIndex = getRandomMusic()


/**
 * 
 * isPlayMode()
 * 设置 播放方式
 */
const isPlayMode = function (e) {
  e.stopPropagation()
  playMode >= 2 ? playMode = 0 : playMode++
  if (playMode == AllplayMode[0]) {
    isShuffle = false;
    this.classList.remove("singleLoop");
    this.classList.add("listLoop");
  } else if (playMode == AllplayMode[1]) {
    isShuffle = true;
    audioSource.loop = false;
    this.classList.remove("listLoop");
    this.classList.add("randomLoop");

  } else if (playMode == AllplayMode[2]) {
    isShuffle = false;
    audioSource.loop = true;
    this.classList.remove("randomLoop");
    this.classList.add("singleLoop");
  }
}
playModeBtn.addEventListener("click", isPlayMode)


/**
 * 音量控制
 */
const volumeControl = {
  // 存储静音前的音量值
  lastVolume: CONFIG.VOLUME.DEFAULT,
  change(e) {
    // 阻止事件冒泡和默认行为
    e.stopPropagation();
    e.preventDefault();
    const volume = playVolumeRange.value;
    const percentage = (volume / playVolumeRange.max) * 100;

    audioSource.volume = volume;
    audioSource.muted = false;
    this.lastVolume = volume; // 保存最后的音量值
    playVolumeColorFill.style.width = `${percentage}%`;

    this.updateVolumeIcon(volume > 0);
  },

  updateVolumeIcon(hasSound) {
    if (audioSource.muted || audioSource.volume === 0) {
      playVolumeIcon.classList.remove('sound');
      playVolumeIcon.classList.add('mute');
    } else {
      playVolumeIcon.classList.add('sound');
      playVolumeIcon.classList.remove('mute');
    }
  },

  toggleMute(e) {
    e.stopPropagation();
    e.preventDefault();
    audioSource.muted = !audioSource.muted;

    // 更新音量条显示
    if (audioSource.muted) {
      // 静音时保持进度条显示，但更新图标
      playVolumeRange.value = 0;
      playVolumeColorFill.style.width = '0%';
    } else {
      // 取消静音时恢复之前的音量
      audioSource.volume = this.lastVolume;
      playVolumeRange.value = this.lastVolume;
      const percentage = (audioSource.volume / playVolumeRange.max) * 100;
      playVolumeColorFill.style.width = `${percentage}%`;
    }
    this.updateVolumeIcon(!audioSource.muted);
  },
  // 初始化音量控制
  init() {
    // 设置初始音量和显示
    const initialVolume = CONFIG.VOLUME.DEFAULT;
    audioSource.volume = initialVolume;
    this.lastVolume = initialVolume;
    playVolumeRange.value = initialVolume;

    const percentage = (initialVolume / playVolumeRange.max) * 100;
    playVolumeColorFill.style.width = `${percentage}%`;

    this.updateVolumeIcon(true);
  }
};

// 绑定音量控制事件
playVolumeRange.addEventListener("input", volumeControl.change.bind(volumeControl));
playVolumeRange.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

// 添加新的音量图标点击事件
playVolumeIcon.addEventListener("click", volumeControl.toggleMute.bind(volumeControl));

// 为音量控制区域添加点击事件阻止
const volumeControlArea = document.querySelector('.volume-control');
if (volumeControlArea) {
  volumeControlArea.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
}

// 初始化音量控制
volumeControl.init();

/**
 * playSelectMusic()
 * 播放选中的音乐
 * 
 */
const playSelectMusic = function (e) {
  e.stopPropagation();

  // 获取点击的元素
  const clickedElement = e.target.closest('.contentList-item');
  if (!clickedElement) return;  // 如果点击的不是列表项，直接返回

  // 获取数据索引
  const musicIndex = parseInt(clickedElement.dataset.id);

  // 验证索引的有效性
  if (isNaN(musicIndex) || musicIndex < 0 || musicIndex >= currentMusicList.length) {
    console.error('无效的音乐索引:', musicIndex);
    return;
  }

  // 更新当前音乐索引
  currentMusicIndex = musicIndex;

  // 更新列表项的激活状态
  const playArray = Array.from(contentList.children);
  playArray.forEach((element) => {
    element.classList.remove('active');
  });
  clickedElement.classList.add('active');

  // 播放音乐
  playingTool();
}
// 绑定事件监听
addEventListeners(contentList, {
  'dblclick': playSelectMusic
});
/**
 * initMusicList()
 * 初始化 列表
 */
const initMusicList = function () {

  // 清空现有内容
  contentList.innerHTML = '';

  for (let [idx, music] of currentMusicList.entries()) {
    // console.log(idx)
    contentList.innerHTML += `
    <div class="contentList-item flex fs-14 fw-5"  data-id='${idx}'>
      <div class="item-img">
        <img src="${music.imgPath}" alt="">
      </div>
      <div class="item-title text-ol ">${music.title}</div>
      <div class="item-author text-ol  ">${music.author}</div>
      <div class="item-album text-ol  ">${music.type}</div>
      <div class="item-totalTime text-ol flex">${music.time}</div>

    </div>                 
    `
  }

}
initMusicList()

/**
 * 悬浮窗
 * @param {*} event 
 * @returns 
 */
function showHoverWindow(event) {
  // 获取触发事件的列表项元素
  const item = event.target.closest('.contentList-item');
  if (!item) return; // 如果不是列表项，直接返回

  // 获取音乐索引
  const dataIndex = parseInt(item.getAttribute('data-id'));
  if (isNaN(dataIndex) || dataIndex < 0 || dataIndex >= currentMusicList.length) {
    console.error('无效的音乐索引:', dataIndex);
    return;
  }

  // 获取音乐描述信息
  const musicData = currentMusicList[dataIndex];
  if (!musicData || !musicData.des) {
    console.log('该音乐没有描述信息');
    return;
  }

  const hoverWindow = document.getElementById('hoverWindow');
  const hoverContent = document.getElementById('hoverContent');
  if (!hoverWindow || !hoverContent) return;

  // 获取item的位置信息
  const itemRect = item.getBoundingClientRect();
  const itemWidth = itemRect.width;
  const itemLeft = itemRect.left;

  // 计算鼠标相对item的水平位置
  const mouseX = event.clientX;

  // 判断鼠标是否在item的右半部分
  const isMouseInRightHalf = (mouseX - itemLeft) > (itemWidth / 2);

  // 设置悬浮窗的内容并显示
  hoverContent.innerHTML = `${musicData.des.replace(/\n/g, '<br>')}`;
  hoverWindow.style.display = 'block';

  // 强制浏览器重新计算悬浮窗宽度
  const hoverWindowWidth = hoverWindow.offsetWidth;
  const hoverWindowHeight = hoverWindow.offsetHeight;

  // 根据鼠标位置调整悬浮窗的显示位置
  if (isMouseInRightHalf) {
    hoverWindow.style.left = `${mouseX - hoverWindowWidth}px`; // 显示在鼠标左侧
  } else {
    hoverWindow.style.left = `${mouseX}px`; // 显示在鼠标右侧
  }

  // 判断鼠标是否接近屏幕底部
  const windowHeight = window.innerHeight;
  const mouseY = event.clientY;

  if (mouseY + hoverWindowHeight > windowHeight) {
    hoverWindow.style.top = `${mouseY - hoverWindowHeight}px`; // 显示在鼠标上方
  } else {
    hoverWindow.style.top = `${mouseY}px`; // 显示在鼠标下方
  }
}

function hideHoverWindow() {
  const hoverWindow = document.getElementById('hoverWindow');
  if (hoverWindow) {
    hoverWindow.style.display = 'none';
  }
}

// 绑定事件监听
addEventListeners(contentList, {
  'mouseover': showHoverWindow,
  'mouseout': hideHoverWindow
});


// 监听键盘按下事件
const keyActionMap = {
  'Enter': () => document.getElementById("btn-play").click(),
  ' ': () => document.getElementById("btn-play").click(),
  'ArrowLeft': () => document.getElementById("btn-pre").click(),
  'ArrowRight': () => document.getElementById("btn-next").click()
};

document.addEventListener('keydown', ({ key }) => {
  if (keyActionMap[key]) {
    keyActionMap[key]();
  }
});

/**
 * Start()
 * 启动 初始化渲染等
 */
const Start = function () {
  updatePlayInfo()
}

Start()

/**
 * 切换标签页
 * @param {HTMLElement} tabElement - 被点击的标签页元素
 */
const switchTab = (tabElement) => {
  // 如果点击的选项卡已经是活动状态，则不进行任何操作
  if (tabElement.classList.contains('active')) {
    return;
  }

  // 更新标签页状态
  const tabs = document.querySelectorAll('.list-tab > div');
  tabs.forEach(tab => tab.classList.remove('active'));
  tabElement.classList.add('active');

  // 获取标签页对应的音乐列表
  const tabName = tabElement.dataset.tab;
  if (tabName) {
    // 更新音乐列表
    currentMusicList.length = 0;
    currentMusicList.push(...getMusicList(tabName));

    // 重新初始化列表
    initMusicList();
  }
};

// 绑定标签页点击事件
const initTabs = () => {
  const tabs = document.querySelectorAll('.list-tab > div');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab));
  });
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  // ... 其他初始化代码 ...
});

// 导出 switchTab 函数（如果需要在其他模块中使用）
export { switchTab };



/**
 * 2023-10-26
 * 保持屏幕常亮
 */
let wakeLock = null;

// 检查浏览器是否支持Wake Lock API
if ('wakeLock' in navigator) {
  // 请求屏幕常亮权限
  (async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('已获得屏幕常亮权限');
    } catch (error) {
      console.error('无法获得屏幕常亮权限:', error);
    }
  })();

  // 监听页面关闭事件，释放屏幕常亮权限
  window.addEventListener('unload', () => {
    if (wakeLock !== null) {
      wakeLock.release();
    }
  });
} else {
  console.log('你的浏览器不支持Wake Lock API');
}


