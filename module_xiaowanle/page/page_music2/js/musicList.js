//音乐根路径
const FILE_MUSIC_ROOT = './music/';
//作者未知
const AUTHOR_DEFAULT = "未知";
//默认图片路径
const IMG_DEFAULT_PATH1 = "./imgs/music_3-400x400.jpg";
const IMG_DEFAULT_PATH2 = "./imgs/music_3-400x400.jpg";
const IMG_DEFAULT_PATH3 = "./imgs/music_3-400x400.jpg";

// 空白格  dance monkey 绿光  那些年 我怀念的  生生世世爱 偏爱  
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

// musicList5
const TYPE_5 = "气势BGNM"
const FILE_MUSIC_BGM = 'bgm/'

// musicList6
const TYPE_6 = "律动"
const FILE_MUSIC_lvdong = 'lvdong/'


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
    des: "每次一听这深邃、高远的旋律，如雄鹰翱翔在蓝天，悠然自在，每个吹奏的音符敲击心怀，释放自己。"
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
    des: "天人合一的自然美感。"
  },
  {
    title: "兰花草 (天籁般的哼唱) - 卡洛儿",
    author: "卡洛儿",
    name_path: "兰花草.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/卡洛儿.jpg",
    time: '04:19',
    lyrics: false,
    des: "兰花草的香，兰花草的甜，我种兰花草，只待故人归，哪怕春去秋过冬又来。"
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
    des: "一首空灵清澈令人感动令人着迷的天籁吟唱 \n 唯美的旋律，迷人的天籁，如空谷的风轻柔不羁，空灵清澈地吟唱着美丽与哀愁，让人怀想起那些曾经青涩而纯真的画面。 \n西丝尔(Sissel Kyrkjebo)挪威著名的女歌手，正如电影《泰坦尼克》配乐中那幽幽天籁，其歌声总能抚慰感伤的心绪。"
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
    des: "完美的女声吟唱。选自卡洛儿《一尘不染》"
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
    des: "《斯卡布罗集市》仿佛在倾诉什么，细雨敲窗的秋夜，她的倾诉，能把你带进逝去的情感伤痛中，回味曾经拥有的凄美的爱恋；\n心情烦躁的时候，她的倾诉，能把你带进寂静山林的深处，静坐在纯洁净美的幽谷里冷却自我；\n春风得意的时候，她的倾诉，能把你带进空灵梦幻苍穹里，感受并憧憬充满希望未来人生。\n总之，无论何时何地，《斯卡布罗集市》的天籁之声能陪你的心灵一起悲欢、一同祈祷……"
  },
  {
    title: "我的歌声里-钢琴曲",
    author: "赵海洋",
    name_path: "我的歌声里-钢琴曲.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/我的歌声里.jpg",
    time: '03:29',
    lyrics: false,
    des: "你没有办法在这个忘却的世间用声音来将谁记得\n回忆过了期\n你已不再年少\n病态\n焦躁\n彷徨还有不安\n尽管是这样不堪的我\n仍想牵着你的手\n拼尽整个青春\n与你一同到天涯\n她在我的梦里。"
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
    des: "一曲琴韵瑟瑟，悲欢尘世离合。\n醮一抹沧桑，盈满袖暗香，将尘俗情思泯于无痕。\n在指间舞落一世繁华，弹尽一曲浪漫忧伤。\n掮一轮皓月，携一缕清风，穿越千年尘烟。\n寂寞纤指滑过灵魂的忧伤，多少深情未了。\n多少笑泪飞扬，蓦然回首，惘然一梦，\n惘然回顾中，却早已遗失了你。"
  },
  {
    title: "一叶子 - 林键标",
    author: "林键标",
    name_path: "一叶子 - 林键标.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/一叶子.jpg",
    time: '03:16',
    lyrics: false,
    des: "独孤轻吟"
  },
  {
    title: "秋日私语 - Richard Clayderman",
    author: "Richard Clayderman",
    name_path: "秋日私语 - Richard Clayderman.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/15.jpg",
    time: '03:22',
    lyrics: false,
    des: "那日的午后"
  },
  {
    title: "醉清风 - 弦子",
    author: "弦子",
    name_path: "醉清风 - 弦子.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/16.jpg",
    time: '05:07',
    lyrics: true,
    des: "且听清风拂过。"
  },
  {
    title: "寂静的天空 (来自草原的寂静天籁) - 代青塔娜",
    author: "代青塔娜",
    name_path: "寂静的天空 (来自草原的寂静天籁) - 代青塔娜.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/17.jpg",
    time: '06:05',
    lyrics: false,
    des: "在那风吹的草原\n有我心上的人\n风啊 你轻轻吹\n听他忧伤的歌\n月亮啊 你照亮他\n火光啊 你温暖他\n在那遥远的天空 有我思念的云\n夜莺呀 你轻声和\n听我静静地唱\n云啊 飘向何方\n心啊 随好流浪"
  },
  {
    title: "送别 (口琴伴奏版) - 群星",
    author: "群星",
    name_path: "送别 (口琴伴奏版) - 群星.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/17.jpg",
    time: '04:54',
    lyrics: true,
    des: "愿漂泊的人有酒喝，愿孤独的人会唱歌。\n往前走，别回头。",
    lyricstype: true
  },
  {
    title: "call of silence",
    author: "",
    name_path: "call of silence.mp3",
    type: TYPE_2,
    type_path: FILE_MUSIC_QINGYINYUE,
    imgPath: "./imgs/17.jpg",
    time: '04:39',
    lyrics: false,
    des: "",
    lyricstype: true
  },
]

//emo  不经意间 你已经悄然离去 只留下一段回忆  很遗憾，我没能成为你的偏爱和例外
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
    des: "遇见的都是幸运，或许下次见面真的只能靠运气了。然而我几乎不出门啊"
  },
  {
    title: "十一种孤独",
    author: "宿羽阳",
    name_path: "十一种孤独 - 宿羽阳.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/十一种孤独.webp",
    time: '04:41',
    lyrics: true,
    des: "如果一个人住，千万不要在下午睡午觉，一觉睡到六七点，等你一睁开眼，看着朦胧黑黑的天空和空荡的房间，会有一种被全世界遗弃的感觉，孤独在这一刻体现的淋漓尽致。"
  },
  {
    title: "十一年（翻自 邱永传） - 阿宇",
    author: "阿宇",
    name_path: "十一年（翻自 邱永传） - 阿宇.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/十一年.webp",
    time: '04:08',
    lyrics: true,
    des: "2011年，那年大一，这个调调成了永远的痛。"
  },
  {
    title: "净化心灵的声音 (Moon Temple) - Karunesh",
    author: "Karunesh",
    name_path: "(Moon Temple) - Karunesh.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/Moon Temple.jpg",
    time: '05:49',
    lyrics: false,
    des: "Moon Temple中文意为“庙堂”，Zen Breakfast意为“道禅”。我想，专辑名为《道禅》是希望每一个听者都能从这飘缈的音乐声中，对社会，对人生，对情感有所感悟吧！\n在纷乱的现实生活中，在复杂的情感世界里，每一个人都活的很累。于是，人们都在尝试着找寻一个不被人所窥视的空间，卸下沉重的包袱，让不堪负重的心灵得到稍许的休憩。就在这一刻，就在《Moon Temple》响起的时候，人性、道德、情感恢复到了本原。尤其是在在钢琴和萧声中，似乎又多了一个空灵的女声，她用温柔和声轻柔的抚摸着每一个听者的心灵创伤。"
  },
  {
    title: "漠河舞厅·2022 - 柳爽",
    author: "Karunesh",
    name_path: "漠河舞厅·2022 - 柳爽.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/漠河舞厅·2022 - 柳爽.jpg",
    time: '05:04',
    lyrics: true,
    des: "“人类用什么衡量爱?”\n “用分开后的痛苦.”"
  },
  {
    title: "丁香花 (2007版) - 唐磊",
    author: "唐磊",
    name_path: "丁香花 (2007版) - 唐磊.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/丁香花 (2007版) - 唐磊.jpg",
    time: '04:25',
    lyrics: true,
    des: "我再也没有见到过你，再也见不到了。"
  },
  {
    title: "청춘 - 산울림（青春）",
    author: "Sanullim",
    name_path: "청춘 - 산울림（青春）.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/청춘 - 산울림（青春）.jpg",
    time: '03:28',
    lyrics: true,
    des: "你是否想起了请回答1988呢"
  },
  {
    title: "一生所爱 - 卢冠廷,莫文蔚",
    author: "卢冠廷,莫文蔚",
    name_path: "一生所爱 - 卢冠廷,莫文蔚.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/一生所爱 - 卢冠廷,莫文蔚.jpg",
    time: '04:33',
    lyrics: true,
    des: "她的手只有我的手四分之三那么大，可我还是没能抓住。"
  },
  {
    title: "BINGBIAN病变 (女声版) - 鞠文娴",
    author: "鞠文娴",
    name_path: "BINGBIAN病变 (女声版) - 鞠文娴.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/BINGBIAN病变 (女声版) - 鞠文娴.jpg",
    time: '04:07',
    lyrics: true,
    des: "你要搞清楚，是你喜欢对方，不是人家喜欢你。\n既然你动心了，主动了，就算受了天大的委屈，也是预料中的事，怪不得任何人。你不是小朋友了，不开心不会死，结果只能自己承担，不管多难过，你也只能自己熬。\n谁叫你有本事喜欢人家，没本事让人家喜欢你呢。"
  },
  {
    title: "山海《完整版》cover(草东没有派对） - 万豹",
    author: "万豹",
    name_path: "山海《完整版》cover(草东没有派对） - 万豹.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/山海《完整版》cover(草东没有派对） - 万豹.jpg",
    time: '04:09',
    lyrics: true,
    des: "我们都太胆小了\n民国时不敢做军阀\n乱世里不敢去起义\n太平盛世不敢说我爱你"
  },
  {
    title: "书房 - 顾君豪",
    author: "顾君豪",
    name_path: "书房 - 顾君豪.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/12.jpg",
    time: '04:52',
    lyrics: true,
    des: "这种感觉真的很糟\n因为一句话就高兴半天\n发现了一件事就心凉半截\n喜欢不能太明显 不然不值钱"
  },
  {
    title: "清新的小女孩 (For Ma) - July Tun",
    author: "July Tun",
    name_path: "清新的小女孩 (For Ma) - July Tun.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/14.jpg",
    time: '04:01',
    lyrics: true,
    des: "也许永远都不可能懂，但不影响她很好听。"
  },
  {
    title: "思君黯然 - 陈国樑",
    author: "陈国樑",
    name_path: "思君黯然 - 陈国樑.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/16.jpg",
    time: '01:36',
    lyrics: false,
    des: "阿朱 。"
  },
  {
    title: "思君黯然 二胡版",
    author: "浩然ERHU",
    name_path: "思君黯然 二胡版.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/16.jpg",
    time: '01:26',
    lyrics: false,
    des: "阿朱 。"
  },
  {
    title: "雪见—仙凡之旅 - 麦振鸿",
    author: "麦振鸿",
    name_path: "雪见—仙凡之旅 - 麦振鸿.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/雪见—仙凡之旅 - 麦振鸿.jpg",
    time: '04:50',
    lyrics: false,
    des: "记得那个为爱掏心的红毛怪，有着无尽相思的夕瑶，等待千年的龙葵，为老大割肉的茂茂，假装背叛死无全尸的必平，纠缠了三生三世放不下的紫萱和徐长卿，还有那个用自己的命换天下人复活的景天，以思念幻化成型的雪见。都说景天负了夕瑶，只有夕瑶知道，景天不是飞蓬。"
  },
  {
    title: "共伴闯天涯 - 麦振鸿",
    author: "麦振鸿",
    name_path: "共伴闯天涯 - 麦振鸿.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/共伴闯天涯 - 麦振鸿.jpg",
    time: '03:22',
    lyrics: false,
    des: "“你最心疼编剧给哪个角色写死了”——茂茂，我们到长安了！"
  },
  {
    title: "The Sound Of Silence - Simon & Garfunkel",
    author: "Simon & Garfunkel",
    name_path: "The Sound Of Silence - Simon & Garfunkel.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/The Sound Of Silence - Simon & Garfunkel.jpg",
    time: '03:05',
    lyrics: true,
    des: "当我独自走在路上，在街道的灯光笼罩下，我看见人头攒动，有的人在说着无聊的话，有的人在听着别人说着无聊的话。"
  },
  {
    title: "无期-石白其",
    author: "石白其",
    name_path: "无期-石白其.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/无期.webp",
    time: '02:41',
    lyrics: true,
    des: "我喜欢你"
  },
  {
    title: "有没有人告诉你 - 陈楚生",
    author: "陈楚生",
    name_path: "有没有人告诉你 - 陈楚生.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/有没有人告诉你 - 陈楚生.jpg",
    time: '04:21',
    lyrics: true,
    des: "我们之间再无交集。",
    lyricstype: true
  },
  {
    title: "假如爱有天意 (Live) - 李健",
    author: "李健",
    name_path: "假如爱有天意 (Live) - 李健.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '05:03',
    lyrics: true,
    des: "如今我们已天各一方",
    lyricstype: true
  },
  {
    title: "灰色空间 - 罗志祥",
    author: "李健",
    name_path: "灰色空间 - 罗志祥.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '03:57',
    lyrics: true,
    des: "灰色空间我是谁",
    lyricstype: true
  },
  {
    title: "Daughter of heaven - 段玫梅",
    author: "段玫梅",
    name_path: "Daughter of heaven - 段玫梅.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '04:18',
    lyrics: false,
    des: "",
    lyricstype: false
  },
  {
    title: "安河桥-宋冬野",
    author: "宋冬野",
    name_path: "安河桥-宋冬野.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '04:10',
    lyrics: false,
    des: "",
    lyricstype: false
  },
  {
    title: "后来-刘若英",
    author: "宋冬野",
    name_path: "后来-刘若英.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '05:41',
    lyrics: false,
    des: "",
    lyricstype: false
  },
  {
    title: "我用什么把你留住-福禄寿",
    author: "福禄寿",
    name_path: "我用什么把你留住-福禄寿.mp3",
    type: TYPE_3,
    type_path: FILE_MUSIC_EMO,
    imgPath: "./imgs/17.jpg",
    time: '05:29',
    lyrics: false,
    des: "",
    lyricstype: false
  },
]

//经典
const musicList4 = [
  {
    title: "夜空中最亮的星 - 逃跑计划",
    author: "逃跑计划",
    name_path: "夜空中最亮的星 - 逃跑计划.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '04:12',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "我的歌声里-曲婉婷",
    author: "曲婉婷",
    name_path: "我的歌声里-曲婉婷.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '03:37',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "我好想你-苏打绿",
    author: "苏打绿",
    name_path: "我好想你-苏打绿.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '05:24',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "水木年华 - 一生有你",
    author: "水木年华",
    name_path: "水木年华 - 一生有你.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '04:18',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "陈一发儿 - 童话镇",
    author: "陈一发儿",
    name_path: "陈一发儿 - 童话镇.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '04:18',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "大海 - 张雨生",
    author: "张雨生",
    name_path: "大海 - 张雨生.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '04:40',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "星星点灯 - 郑智化",
    author: "郑智化",
    name_path: "星星点灯 - 郑智化.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '05:00',
    lyrics: true,
    des: "",
    lyricstype: true
  },
  {
    title: "老鼠爱大米 - 杨臣刚",
    author: "杨臣刚",
    name_path: "老鼠爱大米 - 杨臣刚.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '05:04',
    lyrics: true,
    des: "今天语文老师教我们文言文中“之”的取独用法，以本歌经典歌词为例，翻译成了古汉语：“吾之爱汝，如鼠之爱粟。”简直印象不能再深刻[大哭][大哭][大哭]",
    lyricstype: true
  },
  {
    title: "奇妙能力歌 - 陈粒",
    author: "陈粒",
    name_path: "奇妙能力歌 - 陈粒.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/11.jpg",
    time: '04:13',
    lyrics: true,
    des: "我听过一万首歌，看过一千部电影，读过一百本书，却从未俘获一个人的心。"
  },
  {
    title: "七月上 - Jam",
    author: "Jam",
    name_path: "七月上 - Jam.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/七月上 - Jam.jpg",
    time: '03:11',
    lyrics: true,
    des: "我像个傻子一样记住了你。"
  },
  {
    title: "此生不换",
    author: "青鸟飞鱼",
    name_path: "此生不换 - 青鸟飞鱼.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/此生不换.jpg",
    time: '04:25',
    lyrics: true,
    des: "在初中暗恋三年的同桌，有一天看见她在折星星，\n我问她，这是送给谁的啊，她说，送给她最爱的人，\n过了几天，她送了个熊娃娃给我，我在想，那些星星她是送给谁的?\n过了很多年，我结婚了，生了孩子，把熊给孩子玩，\n一天，孩子不小心把熊撕破了，一大把的星星掉了出来，我顿时泪目。"
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
    des: "​其实我挺羡慕火车的。 \n  为什么? \n 他们连擦肩而过都那么久。"
  },
  {
    title: "美人吟 - 李玲玉",
    author: "李玲玉",
    name_path: "美人吟 - 李玲玉.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/美人吟 - 李玲玉.jpg",
    time: '04:02',
    lyrics: true,
    des: "舒畅。"
  },
  {
    title: "天顶一粒星 - Tizzy T,宋佳",
    author: "Tizzy T,宋佳",
    name_path: "天顶一粒星 - Tizzy T,宋佳.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/9.jpg",
    time: '03:53',
    lyrics: true,
    des: "嘿呀嘿呀咿儿呀"
  },
  {
    title: "仙剑问情(主题曲) - 萧人凤",
    author: "萧人凤",
    name_path: "仙剑问情(主题曲) - 萧人凤.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/仙剑问情(主题曲) - 萧人凤.jpg",
    time: '04:16',
    lyrics: true,
    des: "我李逍遥可以对天发誓从今以后不会再让你一人孤苦伶仃。"
  },
  {
    title: "雨花石（电视连续剧《红红的雨花石》主题歌）",
    author: "陈每文、熊健萍、陈帆等",
    name_path: "雨花石（电视连续剧《红红的雨花石》主题歌）.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '03:49',
    lyrics: true,
    des: "我是一颗小小的石头",
    lyricstype: true
  },
  {
    title: "偏爱-张芸京",
    author: "张芸京",
    name_path: "偏爱-张芸京.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '03:33',
    lyrics: false,
    des: "",
    lyricstype: true
  },
  {
    title: "唯一-告五人",
    author: "告五人",
    name_path: "唯一-告五人.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '04:31',
    lyrics: false,
    des: "",
    lyricstype: true
  },
  {
    title: "不浪漫罪名-王杰",
    author: "王杰",
    name_path: "不浪漫罪名-王杰.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '04:43',
    lyrics: false,
    des: "",
    lyricstype: true
  },
  {
    title: "下雨天-南拳妈妈",
    author: "南拳妈妈",
    name_path: "下雨天-南拳妈妈.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '04:13',
    lyrics: false,
    des: "",
    lyricstype: true
  },
  {
    title: "一直很安静-阿桑",
    author: "阿桑",
    name_path: "一直很安静-阿桑.mp3",
    type: TYPE_4,
    type_path: FILE_MUSIC_JINGDIAN,
    imgPath: "./imgs/17.jpg",
    time: '04:07',
    lyrics: false,
    des: "",
    lyricstype: true
  },

]
//气势BGM
const musicList5 = [
  {
    title: "亡灵序曲 (The Dawn) - Dreamtale",
    author: "Dreamtale",
    name_path: "The Dawn_亡灵序曲.mp3",
    type: TYPE_5,
    type_path: FILE_MUSIC_BGM,
    imgPath: "./imgs/亡灵序曲.jpg",
    time: '04:06',
    lyrics: false,
    des: "《The Dawn》的原意为黎明、拂晓、破晓，但在国内网络上，广被讹传为“亡灵序曲”。"
  },
  {
    title: "伊卡洛斯 Icarus - Ivan Torrent",
    author: "Ivan Torrent",
    name_path: "icarus.mp3",
    type: TYPE_5,
    type_path: FILE_MUSIC_BGM,
    imgPath: "./imgs/Ivan Torrent.jpg",
    time: '04:35',
    lyrics: false,
    des: "Ivan Torrent 是西班牙一个独立作曲家和制作人。为流行音乐和舞蹈艺术家在西班牙工作多年，作为一个设计师，也为广播电台做广告宣传和广告歌曲。现在Ivan Torrent想更专注于电影音乐的场景，为预告片音乐公司工作，以及做演示样品库。"
  },

]

//律动
const musicList6 = [
  {
    title: "Fade - Alan Walker",
    author: "Alan Walker",
    name_path: "Fade - Alan Walker.mp3",
    type: TYPE_6,
    type_path: FILE_MUSIC_lvdong,
    imgPath: "./imgs/Fade - Alan Walker.jpg",
    time: '04:24',
    lyrics: false,
    des: "跑起来吧"
  },
  {
    title: "Something Just Like This - The Chainsmokers,Coldplay",
    author: "The Chainsmokers,Coldplay",
    name_path: "Something Just Like This - The Chainsmokers,Coldplay.mp3",
    type: TYPE_6,
    type_path: FILE_MUSIC_lvdong,
    imgPath: "./imgs/Something Just Like This - The Chainsmokers,Coldplay.jpg",
    time: '04:07',
    lyrics: true,
    des: "喜欢iPad你就去买，喜欢莱卡你就去赚，想喝港式奶茶你就过口岸，想当team leader你就努力学习然后努力去工作，想去威尼斯你就攒钱去，想爱谁你就去爱，想追谁你就去追，想到了就去做，拼命努力，拼命享受，忍着守着惦记着，青春就过去了，何必用40岁的心态过20岁的年华。"
  },
  {
    title: "Dream It Possible - Delacey",
    author: "Delacey",
    name_path: "Dream It Possible - Delacey.mp3",
    type: TYPE_6,
    type_path: FILE_MUSIC_lvdong,
    imgPath: "./imgs/1.jpg",
    time: '03:24',
    lyrics: true,
    des: "“你为什么要那么努力?”\n“想去的地方很远，想要的东西很贵，喜欢的人很优秀，周围人的嘲笑，以及，天生傲骨。”"
  },
  {
    title: "挪威的森林 - 伍佰",
    author: "伍佰",
    name_path: "挪威的森林 - 伍佰.mp3",
    type: TYPE_6,
    type_path: FILE_MUSIC_lvdong,
    imgPath: "./imgs/挪威的森林 - 伍佰.jpg",
    time: '06:33',
    lyrics: true,
    des: "心中是否有我未曾到过的地方啊",
    lyricstype: true
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

const KEY_MUSIC_LIST_5 = 'musicList5';
localStorage.setItem(KEY_MUSIC_LIST_5, JSON.stringify(musicList5));

const KEY_MUSIC_LIST_6 = 'musicList6';
localStorage.setItem(KEY_MUSIC_LIST_6, JSON.stringify(musicList6));





