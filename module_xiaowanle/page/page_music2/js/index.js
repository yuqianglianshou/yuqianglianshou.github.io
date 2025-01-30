'use strict';

// 导入必要的模块和依赖
import { CONFIG } from './config.js';
import { LyricsManager } from './LyricsManager.js';
import { addEventListeners, timeFormatSecondsToMinutes } from './utils.js';
import { getMusicList, MusicStorage, FILE_MUSIC_ROOT } from './musicList.js';

// DOM 选择器简写
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * 全局状态管理
 */
const state = {
  currentMusicIndex: 0,
  playMode: 0, // 0: 列表循环, 1: 随机播放, 2: 单曲循环
  isShuffle: false,
  playInterval: null,
  wakeLock: null,
  currentMusicList: MusicStorage.getListAllMusic()
};

/**
 * DOM 元素引用
 */
const elements = {
  // 播放信息相关元素
  currentPlayImg70: $$('[currentPlay-img70]'),
  currentPlayImg400: Array.from($$('[currentPlay-img400]')),
  currentPlayName: $$('[currentPlay-name]'),
  currentPlayAuthor: $$('[currentPlay-author]'),

  // 进度条相关元素
  playProgress: $$("[play-Progress]"),
  playTotalTime: $$("[play-totalTime]"),
  playCurrentTime: $$("[play-currentTime]"),
  playColorFill: $$("[play-colorFill]"),

  // 控制按钮
  playBtns: $$("[play-btn]"),
  playNextBtns: $$("[play-next-btn]"),
  playPrevBtns: $$("[play-prev-btn]"),
  playModeBtn: $("[play-mode]"),

  // 音量控制
  volumeRange: $("[play-volume-range]"),
  volumeColorFill: $("[play-volume-colorFill]"),
  volumeIcon: $("[play-volume-icon]"),

  // 其他UI元素
  imgBoard: $('.imgBoard'),
  songPanel: $('[song-panel]'),
  contentList: $('[content-list]'),
  playImgBoard: $('[play-imgBorad]'),

  // 播放元素组
  playElements: [
    $$('[currentPlay-img70]'),
    Array.from($$('[currentPlay-img400]')),
    $$('[currentPlay-name]'),
    $$('[currentPlay-author]')
  ]
};

/**
 * 音频控制相关
 */
const audioControl = {
  audioSource: null,

  initAudioSource() {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = CONFIG.VOLUME.DEFAULT;
    return audio;
  },

  init() {
    this.audioSource = this.initAudioSource();
    this.audioSource.addEventListener("loadeddata", progressControl.updateRange);
    this.updateAudioSource();
  },

  updateAudioSource() {
    const audioUrl = FILE_MUSIC_ROOT +
      state.currentMusicList[state.currentMusicIndex].type_path +
      state.currentMusicList[state.currentMusicIndex].name_path;
    this.audioSource.src = audioUrl;
  }
};

/**
 * 歌词管理器初始化
 */
const lyricsManager = new LyricsManager();
lyricsManager.setTimeUpdateCallback((time) => {
  if (audioControl.audioSource) {
    audioControl.audioSource.currentTime = time;
    lyricsManager.update(time);
  }
});

/**
 * 播放控制相关函数
 */
const playbackControl = {
  async startPlayback() {
    try {
      await audioControl.audioSource.play();
      this.updateUIForPlaying();
      this.startPlaybackInterval();
    } catch (error) {
      console.error('播放失败:', error);
      throw error;
    }
  },

  stopPlayback() {
    audioControl.audioSource.pause();
    this.updateUIForPaused();
    if (state.playInterval) {
      clearInterval(state.playInterval);
    }
  },

  updateUIForPlaying() {
    elements.playBtns.forEach(btn => {
      btn.classList.add("playing");
      btn.classList.remove("pause");
    });
    elements.playImgBoard.classList.add('active');

    Array.from(elements.contentList.children).forEach((item, index) => {
      item.classList.toggle('active', index === state.currentMusicIndex);
    });
  },

  updateUIForPaused() {
    elements.playBtns.forEach(btn => {
      btn.classList.add("pause");
      btn.classList.remove("playing");
    });
    elements.playImgBoard.classList.remove('active');
  },

  startPlaybackInterval() {
    if (state.playInterval) {
      clearInterval(state.playInterval);
    }

    state.playInterval = setInterval(() => {
      // 修改这里，使用正确的方法引用
      progressControl.updateRunningTime();
      if (lyricsManager && !audioControl.audioSource.paused) {
        lyricsManager.update(audioControl.audioSource.currentTime);
      }
    }, CONFIG.UPDATE_INTERVAL);
  },

  async playMusic(e) {
    if (e) e.stopPropagation();

    try {
      if (audioControl.audioSource.paused) {
        await this.startPlayback();
      } else {
        this.stopPlayback();
      }
    } catch (error) {
      console.error('播放失败:', error);
      alert(`播放失败: ${error.message}\n请检查音频文件是否存在或已损坏`);
    }
  },
  async playSkipNext(e) {
    if (e) e.stopPropagation();

    if (state.isShuffle) {
      playModeControl.shuffleMusic();
    } else {
      state.currentMusicIndex = state.currentMusicIndex >= state.currentMusicList.length - 1 ?
        0 : state.currentMusicIndex + 1;
    }

    playlistControl.updatePlayInfo();
    await this.startPlayback().catch(error => {
      console.error('播放失败:', error);
      alert(`播放失败: ${error.message}\n请检查音频文件是否存在或已损坏`);
    });
  },

  async playSkipPrev(e) {
    if (e) e.stopPropagation();

    if (state.isShuffle) {
      playModeControl.shuffleMusic();
    } else {
      state.currentMusicIndex = state.currentMusicIndex <= 0 ?
        state.currentMusicList.length - 1 : state.currentMusicIndex - 1;
    }

    playlistControl.updatePlayInfo();
    await this.startPlayback().catch(error => {
      console.error('播放失败:', error);
      alert(`播放失败: ${error.message}\n请检查音频文件是否存在或已损坏`);
    });
  }

};
/**
 * 面板控制
 */
const panelControl = {
  togglePanel(e) {
    if (e) e.stopPropagation();

    if (document.fullscreenElement) {
      this.exitFullscreen();
    }

    elements.imgBoard.classList.toggle('active');
    elements.songPanel.classList.toggle('active');
  },

  enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  },

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },

  toggleFullscreen(e) {
    if (e) e.stopPropagation();

    const songPanel = $('.song_panel');
    if (!songPanel) return;

    if (document.fullscreenElement) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen(songPanel);
    }
  }
};
/**
 * 进度条控制
 */
const progressControl = {
  updateRange() {
    elements.playProgress.forEach((progress, i) => {
      progress.max = Math.ceil(audioControl.audioSource.duration);
      elements.playTotalTime[i].textContent = timeFormatSecondsToMinutes(Number(progress.max));
    });
  },

  updateRunningTime() {
    elements.playProgress.forEach((progress, i) => {
      progress.value = audioControl.audioSource.currentTime;
      elements.playCurrentTime[i].textContent = timeFormatSecondsToMinutes(audioControl.audioSource.currentTime);
    });
    this.updateRangeColor();
    this.checkMusicEnd();
  },

  updateRangeColor(e) {
    let element = elements.playProgress[0];
    if (e) {
      element = e.target;
    }

    const rangeValue = (element.value / element.max) * 100;
    elements.playColorFill.forEach(fill => {
      fill.style.width = `${rangeValue}%`;
    });

    if (rangeValue < CONFIG.TRANSITION.INTERVAL) {
      element.value -= 1;
    }

    elements.playProgress.forEach(progress => {
      progress.value = element.value;
    });
  },

  updatePlaytime(e) {
    e.stopPropagation();
    const currentTime = parseFloat(e.target.value);
    audioControl.audioSource.currentTime = currentTime;

    elements.playCurrentTime.forEach(el => {
      el.textContent = timeFormatSecondsToMinutes(currentTime);
    });

    if (lyricsManager) {
      const currentMusic = state.currentMusicList[state.currentMusicIndex];
      if (currentMusic?.lyrics) {
        lyricsManager.isAutoScrolling = true;
        lyricsManager.update(currentTime);
      }
    }
  },

  checkMusicEnd() {
    if (audioControl.audioSource.ended) {
      elements.playBtns.forEach(btn => {
        btn.classList.remove("playing");
        btn.classList.add("pause");
      });

      if (state.playMode === 0 || state.playMode === 1) {
        const nextBtn = document.getElementById("btn-next");
        if (nextBtn) {
          nextBtn.dispatchEvent(new Event("click"));
        }
      }
    }
  }
};

/**
 * 音量控制
 */
const volumeControl = {
  lastVolume: CONFIG.VOLUME.DEFAULT,

  change(e) {
    e.stopPropagation();
    e.preventDefault();

    const volume = elements.volumeRange.value;
    const percentage = (volume / elements.volumeRange.max) * 100;

    audioControl.audioSource.volume = volume;
    audioControl.audioSource.muted = false;
    this.lastVolume = volume;
    elements.volumeColorFill.style.width = `${percentage}%`;

    this.updateVolumeIcon(volume > 0);
  },

  updateVolumeIcon(hasSound) {
    if (audioControl.audioSource.muted || audioControl.audioSource.volume === 0) {
      elements.volumeIcon.classList.remove('sound');
      elements.volumeIcon.classList.add('mute');
    } else {
      elements.volumeIcon.classList.add('sound');
      elements.volumeIcon.classList.remove('mute');
    }
  },

  toggleMute(e) {
    e.stopPropagation();
    e.preventDefault();

    audioControl.audioSource.muted = !audioControl.audioSource.muted;

    if (audioControl.audioSource.muted) {
      elements.volumeRange.value = 0;
      elements.volumeColorFill.style.width = '0%';
    } else {
      audioControl.audioSource.volume = this.lastVolume;
      elements.volumeRange.value = this.lastVolume;
      const percentage = (audioControl.audioSource.volume / elements.volumeRange.max) * 100;
      elements.volumeColorFill.style.width = `${percentage}%`;
    }

    this.updateVolumeIcon(!audioControl.audioSource.muted);
  },

  init() {
    const initialVolume = CONFIG.VOLUME.DEFAULT;
    audioControl.audioSource.volume = initialVolume;
    this.lastVolume = initialVolume;
    elements.volumeRange.value = initialVolume;

    const percentage = (initialVolume / elements.volumeRange.max) * 100;
    elements.volumeColorFill.style.width = `${percentage}%`;

    this.updateVolumeIcon(true);
  }
};

/**
 * 播放列表控制
 */
const playlistControl = {
  initMusicList() {
    elements.contentList.innerHTML = '';

    state.currentMusicList.forEach((music, idx) => {
      elements.contentList.innerHTML += `
        <div class="contentList-item flex fs-14 fw-5" data-id='${idx}'>
          <div class="item-img">
            <img src="${music.imgPath}" alt="">
          </div>
          <div class="item-title text-ol ">${music.title}</div>
          <div class="item-author text-ol ">${music.author}</div>
          <div class="item-album text-ol ">${music.type}</div>
          <div class="item-totalTime text-ol flex">${music.time}</div>
        </div>
      `;
    });
  },

  updatePlayInfo() {
    elements.playElements.forEach((elementGroup, index) => {
      elementGroup.forEach(element => {
        if (index <= 1) {
          element.src = state.currentMusicList[state.currentMusicIndex].imgPath;
          element.alt = '...';
        } else if (index === 2) {
          element.textContent = state.currentMusicList[state.currentMusicIndex].title;
          element.title = state.currentMusicList[state.currentMusicIndex].title;
        } else {
          element.textContent = state.currentMusicList[state.currentMusicIndex].author;
          element.title = state.currentMusicList[state.currentMusicIndex].author;
        }
      });
    });

    audioControl.updateAudioSource();

    if (lyricsManager) {
      lyricsManager.clear();
      lyricsManager.loadLyrics(state.currentMusicList[state.currentMusicIndex]);
    }
  },

  playSelectMusic(e) {
    e.stopPropagation();

    const clickedElement = e.target.closest('.contentList-item');
    if (!clickedElement) return;

    const musicIndex = parseInt(clickedElement.dataset.id);
    if (isNaN(musicIndex) || musicIndex < 0 || musicIndex >= state.currentMusicList.length) {
      console.error('无效的音乐索引:', musicIndex);
      return;
    }

    state.currentMusicIndex = musicIndex;

    Array.from(elements.contentList.children).forEach(element => {
      element.classList.remove('active');
    });
    clickedElement.classList.add('active');
    // 修改这里，直接调用需要的方法
    this.updatePlayInfo();
    playlistControl.updatePlayInfo();
    playbackControl.startPlayback().catch(error => {
      console.error('播放失败:', error);
      alert(`播放失败: ${error.message}\n请检查音频文件是否存在或已损坏`);
    });
  }
};

/**
 * 播放模式控制
 */
const playModeControl = {
  isPlayMode(e) {
    e.stopPropagation();
    state.playMode = state.playMode >= 2 ? 0 : state.playMode + 1;

    if (state.playMode === 0) {
      state.isShuffle = false;
      this.classList.remove("singleLoop");
      this.classList.add("listLoop");
    } else if (state.playMode === 1) {
      state.isShuffle = true;
      audioControl.audioSource.loop = false;
      this.classList.remove("listLoop");
      this.classList.add("randomLoop");
    } else {
      state.isShuffle = false;
      audioControl.audioSource.loop = true;
      this.classList.remove("randomLoop");
      this.classList.add("singleLoop");
    }
  },

  shuffleMusic() {
    state.currentMusicIndex = Math.floor(Math.random() * state.currentMusicList.length);
  }
};

/**
 * 事件监听器初始化
 */
function initEventListeners() {
  // 播放控制事件
  addEventListeners(elements.playBtns, {
    'click': playbackControl.playMusic.bind(playbackControl),
    'dblclick': e => e.stopPropagation()
  });
  addEventListeners(elements.playNextBtns, {
    'click': playbackControl.playSkipNext.bind(playbackControl),
    'dblclick': e => e.stopPropagation()
  });

  addEventListeners(elements.playPrevBtns, {
    'click': playbackControl.playSkipPrev.bind(playbackControl),
    'dblclick': e => e.stopPropagation()
  });

  // 面板控制事件
  $('#fullscreen-btn')?.addEventListener('click', panelControl.toggleFullscreen.bind(panelControl));
  $('#close-panel-btn')?.addEventListener('click', panelControl.togglePanel.bind(panelControl));
  $('#app-footer')?.addEventListener('click', panelControl.togglePanel.bind(panelControl));

  // 防止面板内部点击关闭
  $('.song_panel')?.addEventListener('click', e => e.stopPropagation());

  // 进度条事件
  addEventListeners(elements.playProgress, {
    'input': e => {
      progressControl.updateRangeColor(e);
      progressControl.updatePlaytime(e);
    },
    'change': e => {
      progressControl.updateRangeColor(e);
      progressControl.updatePlaytime(e);
    },
    'click': e => e.stopPropagation()
  });

  // 音量控制事件
  elements.volumeRange.addEventListener("input", volumeControl.change.bind(volumeControl));
  elements.volumeRange.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
  });
  elements.volumeIcon.addEventListener("click", volumeControl.toggleMute.bind(volumeControl));

  // 使用防抖处理悬浮窗显示
  const debouncedShowHover = debounce(showHoverWindow, 50);
  // 播放列表事件
  addEventListeners(elements.contentList, {
    'dblclick': playlistControl.playSelectMusic.bind(playlistControl), // 修改这里，绑定正确的this
    'mousemove': debouncedShowHover,
    'mouseout': hideHoverWindow
  });

  // 播放模式事件
  elements.playModeBtn.addEventListener("click", playModeControl.isPlayMode);

  // 键盘事件
  document.addEventListener('keydown', handleKeyboardEvents);
}

/**
 * 键盘事件处理
 */
const keyActionMap = {
  'Enter': () => document.getElementById("btn-play").click(),
  ' ': () => document.getElementById("btn-play").click(),
  'ArrowLeft': () => document.getElementById("btn-pre").click(),
  'ArrowRight': () => document.getElementById("btn-next").click()
};

function handleKeyboardEvents({ key }) {
  if (keyActionMap[key]) {
    keyActionMap[key]();
  }
}

/**
 * 悬浮窗控制
 */
function showHoverWindow(event) {
  const item = event.target.closest('.contentList-item');
  if (!item) return;

  const dataIndex = parseInt(item.getAttribute('data-id'));
  if (isNaN(dataIndex) || dataIndex < 0 || dataIndex >= state.currentMusicList.length) {
    console.error('无效的音乐索引:', dataIndex);
    return;
  }

  const musicData = state.currentMusicList[dataIndex];
  if (!musicData?.des) {
    console.log('该音乐没有描述信息');
    return;
  }

  const hoverWindow = document.getElementById('hoverWindow');
  const hoverContent = document.getElementById('hoverContent');
  if (!hoverWindow || !hoverContent) return;

  hoverContent.innerHTML = musicData.des.replace(/\n/g, '<br>');

  const itemRect = item.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const hoverWindowWidth = 300;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let left = mouseX;
  let top = mouseY + 20;

  if (left + hoverWindowWidth > windowWidth) {
    left = windowWidth - hoverWindowWidth - 20;
  }

  const hoverWindowHeight = hoverWindow.offsetHeight;
  if (top + hoverWindowHeight > windowHeight) {
    top = mouseY - hoverWindowHeight - 10;
  }

  hoverWindow.style.left = `${Math.max(10, left)}px`;
  hoverWindow.style.top = `${Math.max(10, top)}px`;

  requestAnimationFrame(() => {
    hoverWindow.classList.add('visible');
  });
}

function hideHoverWindow() {
  const hoverWindow = document.getElementById('hoverWindow');
  if (hoverWindow) {
    hoverWindow.classList.remove('visible');
  }
}

// 使用防抖优化鼠标移动事件
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 屏幕常亮控制
 */
async function initWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      state.wakeLock = await navigator.wakeLock.request('screen');
      console.log('已获得屏幕常亮权限');
    } catch (error) {
      console.error('无法获得屏幕常亮权限:', error);
    }

    window.addEventListener('unload', () => {
      if (state.wakeLock !== null) {
        state.wakeLock.release();
      }
    });
  } else {
    console.log('你的浏览器不支持Wake Lock API');
  }
}

/**
 * 标签页切换控制
 */
function switchTab(tabElement) {
  if (tabElement.classList.contains('active')) {
    return;
  }

  const tabs = document.querySelectorAll('.list-tab > div');
  tabs.forEach(tab => tab.classList.remove('active'));
  tabElement.classList.add('active');

  const tabName = tabElement.dataset.tab;
  if (tabName) {
    state.currentMusicList = getMusicList(tabName);
    playlistControl.initMusicList();
  }
}

function initTabs() {
  const tabs = document.querySelectorAll('.list-tab > div');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab));
  });
}

/**
 * 应用初始化
 */
function init() {
  audioControl.init();
  volumeControl.init();
  initTabs();
  playlistControl.initMusicList();
  initEventListeners();
  initWakeLock();
  playlistControl.updatePlayInfo();
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', init);

// 导出需要的函数
export { switchTab };
