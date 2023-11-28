
// musicList7
const TYPE_7 = "动画片"
const FILE_MUSIC_donghuapian = 'donghuapian/'


//动画片
const musicList7 = [
  {
    title: "光能使者-田中公平",
    author: "田中公平",
    name_path: "光能使者-田中公平.mp3",
    type: TYPE_7,
    type_path: FILE_MUSIC_donghuapian,
    imgPath: IMG_DEFAULT_PATH1,
    time: '02:52',
    lyrics: false,
    des: "",
    lyricstype: false
  },
  {
    title: "七龙珠",
    author: "橋本潮",
    name_path: "七龙珠.mp3",
    type: TYPE_7,
    type_path: FILE_MUSIC_donghuapian,
    imgPath: IMG_DEFAULT_PATH1,
    time: '03:50',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "数码宝贝",
    author: "和田光司",
    name_path: "数码宝贝.mp3",
    type: TYPE_7,
    type_path: FILE_MUSIC_donghuapian,
    imgPath: IMG_DEFAULT_PATH1,
    time: '04:18',
    lyrics: true,
    des: "",
    lyricstype: true
  },

]


const KEY_MUSIC_LIST_7 = 'musicList7';
localStorage.setItem(KEY_MUSIC_LIST_7, JSON.stringify(musicList7));




