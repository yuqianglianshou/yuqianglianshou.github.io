'use strict';
// "use strict"; 是一种JavaScript的编程指令，它是ECMAScript 5（ES5）引入的严格模式（strict mode）。

// 列表
const allMusicList = [];
const musicList11 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_1) || '[]')
const musicList22 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_2) || '[]')
const musicList33 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_3) || '[]')
const musicList44 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_4) || '[]')
const musicList55 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_5) || '[]')
const musicList66 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_6) || '[]')
const musicList99 = JSON.parse(localStorage.getItem(KEY_MUSIC_LIST_9) || '[]')
allMusicList.push(...musicList11);
allMusicList.push(...musicList22);
allMusicList.push(...musicList33);
allMusicList.push(...musicList44);
allMusicList.push(...musicList55);
allMusicList.push(...musicList66);
allMusicList.push(...musicList99);


const currentMusicList = [];
currentMusicList.push(...allMusicList);
// console.log("当前 currentMusicList  === " + JSON.stringify(currentMusicList, null, 2))

//歌词
const lyricsLists = JSON.parse(localStorage.getItem(KEY_LYRICS_LIST) || '[]');

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// 当前音乐列表序号
let currentMusic = 0
// 音频 对象
const audioSource = new Audio(FILE_MUSIC_ROOT + currentMusicList[currentMusic].type_path + currentMusicList[currentMusic].name_path);
audioSource.volume = 0.8


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
const updateIntervalTime = 500
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


// togglePanel() - 显示隐藏歌词面板
const fullscreenBtn = document.getElementById('fullscreen-btn');
const appFooter = $$('[app_footer]')
const imgBoard = $('.imgBoard')
const songPanel = $('[song-panel]')
const closePanelBtn = $$('[close-panel-btn]')

// 歌词计时器数组
let playLyricsTimeout = []

// playclickedLyrics() - 双击歌词，跳到对应播放
const playLyrics = $('[play-lyrics]')

// scrollUpLyrics() - 控制歌词向上滚动
const wrapLyrics = $('[wrap-lyrics]')
const scrollUpSpeed = 150

// lyricsGoHome() - 歌词回原位
let rollingTimeouter
let rollTransitionInterval
const goHomedelayTime = 2500
const transitionIntervalTime = 20
const transitionReduceNum = 50

// initMusicList() - 初始化列表歌曲
let contentList = $('[content-list]')


/**
  * Helper
  * 
*/
const addEventOnElements = function (elements, eventType, callback) {

  for (let i = 0, len = elements.length; i < len; i++) {
    // bind指向 this，获取 event
    elements[i].addEventListener(eventType, callback.bind(this))
  }
}

const addEventOnElementChildren = function (elements, eventType, callback) {
  for (let i = 0, len = elements.children.length; i < len; i++) {
    elements.children[i].addEventListener(eventType, callback)
  }
}



/** 
 * updatePlayInfo()
 * 设置 修改 播放面板信息
 * const PlayElements = [currentPlayImg70,currentPlayImg400, currentPlayName, currentPlayAuthor]
 */

const updatePlayInfo = function () {
  for (let index in PlayElements) {
    PlayElements[index].forEach((ele) => {
      if (index <= 1) {
        ele.src = currentMusicList[currentMusic].imgPath
        ele.alt = '...'
      } else if (index == 2) {
        ele.textContent = currentMusicList[currentMusic].title
        ele.title = currentMusicList[currentMusic].title
      } else {
        ele.textContent = currentMusicList[currentMusic].author
        ele.title = currentMusicList[currentMusic].author
      }
    })
  }

  // audioSource.src = currentMusicList[currentMusic].musicPath
  audioSource.src = FILE_MUSIC_ROOT + currentMusicList[currentMusic].type_path + currentMusicList[currentMusic].name_path
  console.log("当前 播放  === " + currentMusic + "    " + currentMusicList[currentMusic].title + "  ")

  // 更新歌词
  renderLyrics()
  clearAllLyricsTimeout()
  PauseLyricsTimer()
}

/**
 * playingTool()
 * 播放工具
 */
const playingTool = function () {
  updatePlayInfo()
  playMusic()
}


// ---------------------------------------播放进度和歌词显示部分 start------------------------------------------------------------------------------------



/**
 * togglePanel()
 * 显示|隐藏 歌词面板
 * 
 */
const togglePanel = function (e) {
  if (document.fullscreenElement) {
    //全屏状态，先退出全屏，再隐藏歌词面板
    exitFullscreen();
  }
  imgBoard.classList.toggle('active')
  songPanel.classList.toggle('active')
}
addEventOnElements(appFooter, 'click', togglePanel)
addEventOnElements(closePanelBtn, 'click', togglePanel)

/**
 * 歌词面板全屏显示功能
 * 
 */
fullscreenBtn.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
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
 * getCurrentMusicLyrics()
 * 获取当前音乐 歌词和时间
 * 
 */
const getCurrentMusicLyrics = function () {

  if (currentMusicList[currentMusic].lyrics === false) {
    console.log(currentMusic + "  加载歌词 纯音乐")
    return {
      'text': ['纯音乐请欣赏。'],
      'timer': []
    }
  }

  const currentLyrics = lyricsList.find(item => item.name_path === currentMusicList[currentMusic].name_path);

  if (!currentLyrics) {
    console.log(currentMusic + "  加载歌词 无歌词");
    return {
      'text': ['暂无歌词。'],
      'timer': []
    };
  } else {
    console.log(currentMusic + "  加载歌词 有歌词 ");
    const lyricsText = currentLyrics.lyrics.map(line => line.substring(line.indexOf(']') + 1));
    console.log("Lyrics Text:", lyricsText);

    const lyricsTimer = currentLyrics.lyrics.map(line => {
      const timeStr = line.substring(1, 10); // 提取时间部分，包括毫秒
      // console.log("Time String:", timeStr);
      const [minutes, secondsAndMilliseconds] = timeStr.split(':');
      const [seconds, milliseconds] = secondsAndMilliseconds.split('.').map(parseFloat);
      // console.log("Parsed Time:", minutes, seconds, milliseconds);
      return (parseFloat(minutes) * 60 + parseFloat(seconds) + milliseconds / 1000); // 转换为秒
    });

    console.log("Lyrics Timer:", lyricsTimer);

    return {
      'text': lyricsText,
      'timer': lyricsTimer
    };

  }

}
let currentMusicLyrics = ""
let currentLyricsTimer_init = ""
let currentLyricsTimer_change = [...currentLyricsTimer_init]



/**
 * renderLyrics()
 * 渲染 歌词
 * 
 */
const renderLyrics = function () {
  var arr = getCurrentMusicLyrics()
  currentMusicLyrics = arr.text
  currentLyricsTimer_init = arr.timer
  currentLyricsTimer_change = [...currentLyricsTimer_init]
  console.log(currentMusicLyrics)
  console.log(currentLyricsTimer_init)
  playLyrics.innerHTML = ''
  for (let [idx, data] of currentMusicLyrics.entries()) {
    playLyrics.innerHTML += `
    <div id="line-${idx + 1}" data-time="${currentLyricsTimer_init[idx]}" class="lyric ${idx === 0 ? "active" : ""}">
      <span class="">
        ${data}
      </span>
    </div>
    `
  }
  addEventOnElementChildren(playLyrics, 'dblclick', playclickedLyrics)
}



/** 
 * updateRange()
 * 修改 进度条 max
 * 修改 音乐总时间（从音频获取总长）
 */
const updateRange = function () {
  for (let i = 0; i < playProgress.length; i++) {
    playProgress[i].max = Math.ceil(audioSource.duration)
    playTotalTime[i].textContent = getTotalTime(Number(playProgress[i].max))
  }
}
audioSource.addEventListener("loadeddata", updateRange);


/** 
 * getTotalTime()
 * 获取总时长，秒 -> 分（170s -> 2m50s）
 */
const getTotalTime = function (duration) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.ceil(duration - (minutes * 60))
  const totalTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  return totalTime
}


/** 
 * updateRunningTime()
 * 播放音乐时更新时间(当前播放进度时间) 
 * 
 */
const updateRunningTime = function () {
  for (let i = 0; i < playProgress.length; i++) {
    // 当前播放秒 = 进度条 value
    playProgress[i].value = audioSource.currentTime
    playCurrentTime[i].textContent = getTotalTime(audioSource.currentTime)
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
    if (rangeValue < 20) {
      element.value = element.value - 1
    }
    playProgress[i].value = element.value
  }
}

addEventOnElements(playProgress, "input", updateRangeColor)
addEventOnElements(playProgress, "click", function (e) {
  e.stopPropagation()
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
    playCurrentTime[i].textContent = getTotalTime(e.target.value)
  }

  // 更新计时器 + 滚动歌词
  clearAllLyricsTimeout()
  playRollLyrics(true)
}
addEventOnElements(playProgress, "input", updatePlaytime)



/**
 * playRollLyrics(onlySkip)
 * 参数1 onlySkip - true表示只跳到对应歌词，不更新计时器数组
 * 播放时，处理歌词滚动
 * 
 */
const playRollLyrics = function (onlySkip = false) {
  currentLyricsTimer_change = PauseLyricsTimer()

  const currentLyricsIndex = currentLyricsTimer_init.length - currentLyricsTimer_change.length
  // console.log(currentLyricsIndex)
  if (onlySkip) {
    skipLyrics(currentLyricsIndex)

    // 如果是暂停状态，只跳歌词，不需要计时器
    if (audioSource.paused) {
      return
    }
  }

  for (let i = 0; i < currentLyricsTimer_change.length; i++) {
    playLyricsTimeout[i] = setTimeout(function () {
      // for (let j = 0; j < playLyrics.children.length; j++){
      //   playLyrics.children[j].style.transform = `translateY(${-100 * i}%)`
      // }
      let j = currentLyricsIndex + i
      playLyrics.style.transform = `translateY(${-80 * j}px)`
      // playLyrics.scrollTop='0'

      for (let idx = 0; idx < playLyrics.children.length; idx++) {
        playLyrics.children[idx].classList.remove('active')
      }
      playLyrics.children[j].classList.add('active')
    }, Math.round(currentLyricsTimer_change[i] * 1000))

  }
}


/**
 * skipLyrics()
 * 如果鼠标改变播放进度，直接跳到对应的歌词
 */
const skipLyrics = function (currentLyricsIndex) {
  currentLyricsIndex = currentLyricsIndex <= 0 ? 0 : currentLyricsIndex - 1

  for (let k = 0; k < playLyrics.children.length; k++) {
    playLyrics.children[k].classList.remove('active')
  }
  playLyrics.children[currentLyricsIndex].classList.add('active')
  playLyrics.style.transform = `translateY(${-80 * currentLyricsIndex}px)`
}





/**
 * playclickedLyrics()
 * 双击歌词，跳到对应播放
 */
const playclickedLyrics = function (e) {

  let lyricsDiv = e.target
  if (e.target.tagName === 'SPAN') {
    lyricsDiv = e.target.parentNode
  }
  audioSource.currentTime = Number(lyricsDiv.getAttribute("data-time"))

  // 正在播放，不需要 playMusic()
  if (audioSource.paused) {
    playMusic()
  } else {
    audioSource.play()
    // 关闭 歌词计时器
    clearAllLyricsTimeout()
    // 歌词滚动处理
    playRollLyrics()
  }
}



/**
 * scrollUpLyrics()
 * 使用 tansform 后，导致不能向上滚动，可自行设置(调整滑动速度)
 * 
 */
const scrollUpLyrics = function (e) {
  const matrix = getComputedStyle(playLyrics).getPropertyValue('transform')
  // 矩阵各个值
  //matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
  const translateY = Number(matrix.split(' ').pop().split(')')[0])

  if (!playLyrics.children[0].classList.contains('active') && e.deltaY < 0) {
    playLyrics.style.transform = `translateY(${translateY + scrollUpSpeed}px)`
  }
}
wrapLyrics.addEventListener('wheel', scrollUpLyrics)



/**
 * lyricsGoHome()
 * 鼠标滚动歌词后，停止滚动一段时间(2.5s)后， 返回原位
 * 通过 setInterval 加一个 歌词回原位 过渡效果
 * 
 */
const lyricsGoHome = function (e) {
  if (rollingTimeouter) {
    clearTimeout(rollingTimeouter)
  }
  rollingTimeouter = setTimeout(() => {
    // 过渡效果
    rollTransitionInterval = setInterval(() => {
      e.target.scrollTop = e.target.scrollTop - transitionReduceNum < 0 ? 0 : e.target.scrollTop - transitionReduceNum
      if (e.target.scrollTop === 0) {

        clearInterval(rollTransitionInterval)
      }
    }, transitionIntervalTime)
  }, goHomedelayTime)
}
wrapLyrics.addEventListener('scroll', lyricsGoHome)



/**
 * PauseLyricsTimer()
 * 播放暂停时，记录 暂停时间，重新设置 歌词时间数组
 */

const PauseLyricsTimer = function () {

  currentLyricsTimer_change = [...currentLyricsTimer_init]
  // console.log(currentLyricsTimer_change)
  for (let i = 0; i < currentLyricsTimer_change.length; i++) {
    if (currentLyricsTimer_change[i] >= audioSource.currentTime) {
      currentLyricsTimer_change.splice(0, i)
      break
    }
    else {
      // 当大于 全部歌词时间 
      if (i === currentLyricsTimer_change.length - 1) {
        return []
      }
    }
  }
  currentLyricsTimer_change = currentLyricsTimer_change.map((timer) => {
    // 保留3位，刚好对应毫秒
    timer = Number((timer - audioSource.currentTime).toFixed(3))
    return timer
  })
  return currentLyricsTimer_change
}

/**
 * clearAllLyricsTimeout()
 * 清除所有 歌词计时器
 */
const clearAllLyricsTimeout = function () {
  playLyricsTimeout.forEach((timeouter) => {
    clearTimeout(timeouter)
  })
}


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
 * playMusic()
 * 控制 播放|暂停 音乐
 */

const playMusic = function (e) {
  console.log("playMusic == ");

  //先通过 e = event || window.event 获取事件对象，然后通过 e.stopPropagation() 阻止事件继续向上冒泡，确保只在当前元素上处理该事件。
  e = event || window.event
  e.stopPropagation()

  // loadeddata - 当前帧的数据加载完成且还没有足够的数据播放下一帧时
  audioSource.addEventListener("loadeddata", updateRange)
  if (audioSource.paused) {
    audioSource.play()

    // 歌词滚动
    playRollLyrics()

    // 播放 按钮样式
    playBtns.forEach((btn) => {
      btn.classList.add("playing")
      btn.classList.remove("pause")
    })

    //列表选中样式
    for (let i = 0; i < contentList.children.length; i++) {
      contentList.children[i].classList.remove('active')
    }
    contentList.children[currentMusic].classList.add('active')

    playImgBorad.classList.toggle('active')

    // 每0.5s，更新 当前播放时间
    playInterval = setInterval(updateRunningTime, updateIntervalTime)

  } else {
    audioSource.pause()

    playBtns.forEach((btn) => {
      btn.classList.add("pause")
      btn.classList.remove("playing")
    })
    playImgBorad.classList.toggle('active')

    // 关闭 播放时间计时器
    clearInterval(playInterval)
    // 关闭 歌词计时器
    clearAllLyricsTimeout()

  }
}
addEventOnElements(playBtns, 'click', playMusic)

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
    currentMusic >= currentMusicList.length - 1 ? currentMusic = 0 : currentMusic++
  }
  playingTool()
}
addEventOnElements(playNextBtns, "click", playSkipNext)


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
    currentMusic <= 0 ? currentMusic = currentMusicList.length - 1 : currentMusic--
  }

  playingTool()
}
addEventOnElements(playPrevBtns, "click", playSkipPrev)

/**
 * shuffle()
 * 当前列表 随机播放
 */
const getRandomMusic = () => Math.floor(Math.random() * currentMusicList.length)
const shuffleMusic = () => currentMusic = getRandomMusic()


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
 * 
 * changeVolume()
 * 修改音量
 */
const changeVolume = function (e) {
  e.stopPropagation()

  playVolumeIcon.classList.add('sound')
  playVolumeIcon.classList.remove('mute')

  audioSource.volume = playVolumeRange.value

  const rangeValue = (playVolumeRange.value / playVolumeRange.max) * 100
  playVolumeColorFill.style.width = `${rangeValue}%`
  console.log(audioSource.volume)
  // 开启音量 
  audioSource.muted = false
}
playVolumeRange.addEventListener("input", changeVolume)
playVolumeRange.addEventListener("click", function (e) {
  e.stopPropagation()
})



/**
 * muteVolume()
 * 设置静音
 */
const muteVolume = function (e) {
  e.stopPropagation()
  if (!audioSource.muted) {
    playVolumeIcon.classList.add('mute')
    playVolumeIcon.classList.remove('sound')
    audioSource.muted = true;
  } else {
    playVolumeIcon.classList.remove('mute');
    playVolumeIcon.classList.add('sound');
    audioSource.muted = false;
  }
}
playVolumeIcon.addEventListener("click", muteVolume);

/**
 * playSelectMusic()
 * 播放选中的音乐
 * 
 */
const playSelectMusic = function (e) {
  currentMusic = this.dataset.id
  let playArray = Array.from(this.parentNode.children)

  playArray.forEach((element) => {
    element.classList.remove('active')
  })
  this.classList.add('active')

  playingTool()
}

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
  addEventOnElementChildren(contentList, 'dblclick', playSelectMusic)
  addEventOnElementChildren(contentList, 'mouseover', showHoverWindow);
  addEventOnElementChildren(contentList, 'mouseout', hideHoverWindow);
}
initMusicList()


function showHoverWindow(event) {
  const item = event.currentTarget;
  const dataIndex = item.getAttribute('data-id');
  const musicDes = currentMusicList[dataIndex].des;

  const hoverWindow = document.getElementById('hoverWindow');
  const hoverContent = document.getElementById('hoverContent');

  // 设置悬浮窗的内容并显示
  hoverContent.innerHTML = `${musicDes.replace(/\n/g, '<br>')}`;
  hoverWindow.style.left = `${event.clientX}px`;
  hoverWindow.style.top = `${event.clientY}px`;
  hoverWindow.style.display = 'block';
}

function hideHoverWindow() {
  const hoverWindow = document.getElementById('hoverWindow');
  hoverWindow.style.display = 'none';
}


// 监听键盘按下事件
document.addEventListener('keydown', function (event) {

  if (event.key === "Enter" || event.key === " ") {
    // 在这里执行你的命令
    console.log('回车触发  执行命令');
    const btn = document.getElementById("btn-play");
    const clickEvent = new Event("click");
    btn.dispatchEvent(clickEvent);
  } else if (event.key === "ArrowLeft") {
    // 向左箭头按下
    console.log('向左箭头按下');
    const btn = document.getElementById("btn-pre");
    const clickEvent = new Event("click");
    btn.dispatchEvent(clickEvent);

  } else if (event.key === "ArrowRight") {
    // 向右箭头按下
    console.log('向右箭头按下');
    const btn = document.getElementById("btn-next");
    const clickEvent = new Event("click");
    btn.dispatchEvent(clickEvent);
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

// 将选项卡和对应的音乐列表映射到一个对象中
const tabMusicMap = {
  'tab-A': allMusicList,
  'tab-B': musicList11,
  'tab-C': musicList22,
  'tab-D': musicList33,
  'tab-E': musicList44,
  'tab-F': musicList55,
  'tab-G': musicList66,
  'tab-I': musicList99
};
// 列表切换
function switchTab(tabElement) {

  // 如果点击的选项卡已经是活动状态，则不进行任何操作
  if (tabElement.classList.contains('active')) {
    return;
  }

  const tabs = document.querySelectorAll('.list-tab > div');

  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  tabElement.classList.add('active');

  // 判断选项卡是否在映射对象中
  if (tabElement.classList.contains('tab-A') || tabElement.classList.contains('tab-B') ||
    tabElement.classList.contains('tab-C') || tabElement.classList.contains('tab-D') ||
    tabElement.classList.contains('tab-E') || tabElement.classList.contains('tab-F') ||
    tabElement.classList.contains('tab-G') || tabElement.classList.contains('tab-I')) {

    const tabClassName = Array.from(tabElement.classList).find(className => className.startsWith('tab-'));
    if (tabClassName) {
      console.log(`点击了${tabClassName}选项卡`);
      currentMusicList.length = 0;
      currentMusicList.push(...tabMusicMap[tabClassName]);
      initMusicList();
    }
  }

}


