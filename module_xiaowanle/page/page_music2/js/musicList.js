//音乐根路径
const FILE_MUSIC_ROOT = './music/';
//作者未知
const AUTHOR_DEFAULT = "未知";
//默认图片路径
const IMG_DEFAULT_PATH1 = "./imgs/music_1-400x400.jpg";
const IMG_DEFAULT_PATH2 = "./imgs/music_2-400x400.jpg";
const IMG_DEFAULT_PATH3 = "./imgs/music_3-400x400.jpg";

// type 分类  （轻音乐，伤感，）

// musicPath: FILE_MUSIC_ROOT + type_path + name_path,  ./music/jingdian/我的歌声里.mp3

// musicList1
const TYPE_1 = "天籁之音"
const FILE_MUSIC_TIANLANZHIYIN = 'tianlaizhiyin/'

// musicList2
const TYPE_2 = "轻音乐"
const FILE_MUSIC_QINGYINYUE = 'qingyinyue/'

// musicList3
const TYPE_3 = "emo"
const FILE_MUSIC_EMO = 'emo/'


// musicList4
const TYPE_4 = "经典"
const FILE_MUSIC_JINGDIAN = 'jingdian/'


const TYPE_9 = "未分类"
const FILE_MUSIC_OTHER = 'other/'





//天籁之音
const musicList1 = [
  {
    title: "天籁排箫 老鹰之歌 (El Condor Pasa)",
    author: "Leo Rojas",
    name_path: "天籁排箫 老鹰之歌.mp3",
    type: TYPE_1,
    type_path: FILE_MUSIC_TIANLANZHIYIN,
    imgPath: "./imgs/leo_rojas.jpg",
    time: '03:36',
    lyrics: false,
    des:"每次一听这深邃、高远的旋律，如雄鹰翱翔在蓝天，悠然自在，每个吹奏的音符敲击心怀，释放自己。"
  },

]

//轻音乐
const musicList2 = [
  {
    title: "纯净如圣诗《Idé Were Were》",
    author: "Deva Premal",
    name_path: "纯净如圣诗.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/music_ide.jpg",
    time: '07:59',
    lyrics: false,
    des:"天人合一的自然美感。"
  },
  {
    title: "兰花草",
    author: AUTHOR_DEFAULT,
    name_path: "兰花草.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: IMG_DEFAULT_PATH2,
    time: '04:19',
    lyrics: false,
    des:"兰花草的香，兰花草的甜，我种兰花草，只待故人归，哪怕春去秋过冬又来。"
  },
]

//emo
const musicList3 = [
  {
    title: "ありがとう（泪的告白）",
    author: "墓辰倾心",
    name_path: "泪的告白.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/泪的告白.jpg",
    time: '04:11',
    lyrics: true,
    des:"不经意间 你已经悄然离去 只留下一段回忆"
  },

]

//经典
const musicList4 = [
  {
    title: "此生不换",
    author: "青鸟飞鱼",
    name_path: "此生不换 - 青鸟飞鱼.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/此生不换.jpg",
    time: '04:25',
    lyrics: true,
    des:"在初中暗恋三年的同桌，有一天看见她在折星星，\n我问她，这是送给谁的啊，她说，送给她最爱的人，\n过了几天，她送了个熊娃娃给我，我在想，那些星星她是送给谁的?\n过了很多年，我结婚了，生了孩子，把熊给孩子玩，\n一天，孩子不小心把熊撕破了，一大把的星星掉了出来，我顿时泪目。"
  },
  {
    title: "断点",
    author: "张敬轩",
    name_path: "断点.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/断点.jpg",
    time: '04:28',
    lyrics: true,
    des:"​其实我挺羡慕火车的。 \n  为什么? \n 他们连擦肩而过都那么久。"
  },

]

//未分类
const musicList9 = [
  {
    title: "纸短情长 (完整版)",
    author: "烟把儿乐队",
    name_path: "纸短情长 (完整版)-烟把儿乐队.mp3",
    type: TYPE_9,
    type_path: FILE_MUSIC_OTHER,
    imgPath: "./imgs/music_2-400x400.jpg",
    time: '02:54',
    lyrics: true,
    des:"从遇见你的那一天起，我所走的每一步，都是为了更接近你。"
  },

]



const KEY_MUSIC_LIST_1 = 'musicList1';
localStorage.setItem(KEY_MUSIC_LIST_1, JSON.stringify(musicList1));

const KEY_MUSIC_LIST_2 = 'musicList2';
localStorage.setItem(KEY_MUSIC_LIST_2, JSON.stringify(musicList2));

const KEY_MUSIC_LIST_3 = 'musicList3';
localStorage.setItem(KEY_MUSIC_LIST_3, JSON.stringify(musicList3));

const KEY_MUSIC_LIST_4 = 'musicList4';
localStorage.setItem(KEY_MUSIC_LIST_4, JSON.stringify(musicList4));

const KEY_MUSIC_LIST_9 = 'musicList9';
localStorage.setItem(KEY_MUSIC_LIST_9, JSON.stringify(musicList9));




