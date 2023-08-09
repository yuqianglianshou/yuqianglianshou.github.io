//音乐根路径
const FILE_MUSIC_ROOT = './music/';
//作者未知
const AUTHOR_DEFAULT = "未知";
//默认图片路径
const IMG_DEFAULT_PATH1 = "./imgs/music_3-400x400.jpg";
const IMG_DEFAULT_PATH2 = "./imgs/music_3-400x400.jpg";
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
  {
    title: "莫尔德颂歌 (Molde Canticle) - Sissel",
    author: "Sissel",
    name_path: "莫尔德颂歌.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/莫尔德颂歌.jpg",
    time: '03:26',
    lyrics: false,
    des:"一首空灵清澈令人感动令人着迷的天籁吟唱 \n 唯美的旋律，迷人的天籁，如空谷的风轻柔不羁，空灵清澈地吟唱着美丽与哀愁，让人怀想起那些曾经青涩而纯真的画面。 \n西丝尔(Sissel Kyrkjebo)挪威著名的女歌手，正如电影《泰坦尼克》配乐中那幽幽天籁，其歌声总能抚慰感伤的心绪。"
  },
  {
    title: "斯卡布罗集市 (Scarborough Fair) - 卡洛儿",
    author: "卡洛儿",
    name_path: "斯卡布罗集市.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/卡洛儿.jpg",
    time: '04:24',
    lyrics: false,
    des:"完美的女声吟唱。选自卡洛儿《一尘不染》"
  },
  {
    title: "斯卡布罗集市 (Scarborough Fair) - 莎拉·布莱曼",
    author: "莎拉·布莱曼",
    name_path: "斯卡布罗集市 (Scarborough Fair) - 莎拉·布莱曼.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/Simon & Garfunkel.jpeg",
    time: '04:09',
    lyrics: true,
    des:"《斯卡布罗集市》仿佛在倾诉什么，细雨敲窗的秋夜，她的倾诉，能把你带进逝去的情感伤痛中，回味曾经拥有的凄美的爱恋；\n心情烦躁的时候，她的倾诉，能把你带进寂静山林的深处，静坐在纯洁净美的幽谷里冷却自我；\n春风得意的时候，她的倾诉，能把你带进空灵梦幻苍穹里，感受并憧憬充满希望未来人生。\n总之，无论何时何地，《斯卡布罗集市》的天籁之声能陪你的心灵一起悲欢、一同祈祷……"
  },
  {
    title: "我的歌声里-钢琴曲",
    author: AUTHOR_DEFAULT,
    name_path: "我的歌声里-钢琴曲.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: IMG_DEFAULT_PATH2,
    time: '03:29',
    lyrics: false,
    des:"她在我的梦里。"
  },
  {
    title: "西风（排箫）芈月传 - 王备",
    author: "王备",
    name_path: "西风（排箫）.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/西风.png",
    time: '05:04',
    lyrics: false,
    des:"一曲琴韵瑟瑟，悲欢尘世离合。\n醮一抹沧桑，盈满袖暗香，将尘俗情思泯于无痕。\n在指间舞落一世繁华，弹尽一曲浪漫忧伤。\n掮一轮皓月，携一缕清风，穿越千年尘烟。\n寂寞纤指滑过灵魂的忧伤，多少深情未了。\n多少笑泪飞扬，蓦然回首，惘然一梦，\n惘然回顾中，却早已遗失了你。"
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
    imgPath: "./imgs/烟把儿乐队.jpg",
    time: '02:54',
    lyrics: true,
    des:"从遇见你的那一天起，我所走的每一步，都是为了更接近你。"
  },
  {
    title: "亡灵序曲 (The Dawn) - Dreamtale",
    author: "Dreamtale",
    name_path: "The Dawn_亡灵序曲.mp3",
    type: TYPE_9,
    type_path: FILE_MUSIC_OTHER,
    imgPath: "./imgs/亡灵序曲.jpg",
    time: '04:06',
    lyrics: false,
    des:"《The Dawn》的原意为黎明、拂晓、破晓，但在国内网络上，广被讹传为“亡灵序曲”。"
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




