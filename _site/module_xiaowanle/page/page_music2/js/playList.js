

// const musicArray = [
//   ["玫瑰花的葬礼.mp3", "蔡依林,周杰伦", "music/", "image/神龙.jpg", 0],
//   ["逆战.mp3", "薛之谦", "music/", "image/十月.jpg", 0],
//   ["偏爱.mp3", "胡歌", "music/", "image/神龙.jpg", 0]
// ];

//音乐根路径
const FILE_MUSIC_ROOT = './music/';
//音乐 经典
const FILE_MUSIC_JINGDIAN = 'jingdian/'
//音乐 未分类
const FILE_MUSIC_OTHER = 'other/'
//音乐 轻音乐
const FILE_MUSIC_QINGYINYUE = 'qingyinyue/'
// type 分类  （轻音乐，伤感，）

// musicPath: FILE_MUSIC_ROOT + type_en + name_all,  ./music/jingdian/我的歌声里.mp3
const playList = [
  {
    name: "此生不换",
    name_all: "此生不换 - 青鸟飞鱼.mp3",
    author: "青鸟飞鱼",
    type: "经典",
    type_en: FILE_MUSIC_JINGDIAN,
    // musicPath: FILE_MUSIC_ROOT + FILE_MUSIC_JINGDIAN + name_all,
    imgPath_70: "./imgs/music_2-70x70.jpg",
 
    imgPath_400: "./imgs/music_2-400x400.jpg",
    time: '04:25',
  },

  {
    name: "我的歌声里",
    name_all: "我的歌声里.mp3",
    author: "纯音乐",
    type: "经典",
    type_en: FILE_MUSIC_JINGDIAN,
    musicPath: "./music/jingdian/我的歌声里.mp3",
    imgPath_70: "./imgs/music_1-70x70.jpg",
    imgPath_200: "./imgs/music_1-200x200.jpg",
    imgPath_400: "./imgs/music_1-400x400.jpg",
    time: '03:29',
  },


  // other
  {
    name: "纸短情长 (完整版)",
    author: "烟把儿乐队",
    name_all: "纸短情长 (完整版)-烟把儿乐队.mp3",
    type: "未分类",
    type_en: FILE_MUSIC_OTHER,

    imgPath_70: "./imgs/music_2-70x70.jpg",

    imgPath_400: "./imgs/music_2-400x400.jpg",
    time: '02:54',
  },

  {
    name: "The Dawn_亡灵序曲",
    author: "纯音乐",
    name_all: "The Dawn_亡灵序曲.mp3",
    type: "未分类",
    type_en: FILE_MUSIC_OTHER,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '04:06',
  },




  //轻音乐
  {
    name: "纯净如圣诗",
    author: "纯音乐",
    name_all: "纯净如圣诗.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '07:59',
  },

  {
    name: "兰花草",
    author: "纯音乐",
    name_all: "兰花草.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '04:19',
  },

  {
    name: "莫尔德颂歌",
    author: "纯音乐",
    name_all: "莫尔德颂歌.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '03:26',
  },

  {
    name: "斯卡布罗集市",
    author: "纯音乐",
    name_all: "斯卡布罗集市.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '04:24',
  },

  {
    name: "天籁排箫 老鹰之歌",
    author: "纯音乐",
    name_all: "天籁排箫 老鹰之歌.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '03:36',
  },

  {
    name: "西风（排箫）",
    author: "纯音乐",
    name_all: "西风（排箫）.mp3",
    type: "轻音乐",
    type_en: FILE_MUSIC_QINGYINYUE,
    imgPath_70: "./imgs/music_3-70x70.jpg",
    imgPath_400: "./imgs/music_3-400x400.jpg",
    time: '05:04',
  },

]


const KEY_PLAY_LIST = 'KEY_PLAY_LIST';
localStorage.setItem(KEY_PLAY_LIST, JSON.stringify(playList));










