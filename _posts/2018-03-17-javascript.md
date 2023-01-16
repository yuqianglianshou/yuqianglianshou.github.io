---
layout: post  
title: 初识 JavaScript 的不解 
date: 2018-03-17  
tags:  笔记
---
### 待整理格式化  
 


什么是javascript？

javascript是一种运行于javascript解释器/引擎中的解释型脚本语言；
javascript解释器作为js脚本的运行环境，有如下两种呈现方式：-独立安装的js解释器，如node.js平台。-嵌入在浏览器中的js解释器，如chrome浏览器。

javascript特点：
代码可使用任何文本编辑器编写，语法类似于c和java
脚本文件无需编译，由javascript引擎解释执行
弱类型语言
基于对象
跨平台性

js⽤途
 1、嵌⼊⽂本到我们的HTML页⾯上
 2、对浏览器事件作出响应
 3、读写HTML
 4、在数据提交到服务器之前先做数据验证
 5、检测访客的浏览信息
 6、控制cookie
 7、基于nodeJs技术进⾏服务端的编程
js组成部分
 1、ECMAScript规定核⼼的语法
 2、DOM（document object model）:⽂档对象模型
 3、BOM（browser object model）：浏览器对象模型

基本语法形式:
内部式：在script标签中定义JavaScript程序代码
script标签理论上可以写在任意位置，但是由于计算机程序代码执行顺序问题，所以一般放在body标签内部的最下方。
（补充：所有计算机程序代码  默认都是按照文档流/标准流执行：从上至下，从左至右） 
外部式：在外部js文件中定义JavaScript程序代码，再通过<script src=""></script>引入
导入的script标签一般写在body标签内的最下方。
script只要定义了src属性，不管后面是否跟着路径，内部式就会失效；
导入外部js文件同时，就会立即执行外部js文件内容（同级导入 ./文件名）  
```
    //内部式  
    //<script>
    //   document.write("今天是8月28日");
    //</script>
 
 
    //外部式
    //<script src="js路径">
    //</script>
```

如何运行：

一：
1，创建 01.html 文件，内容为  
<script src="01.js"></script>
2,同目录下创建 01.js 文件，内容为 
console.log('Hello World');
3,将01.html 拖拽到浏览器中，在浏览器的控制台即可看到输出日志 Hello World

二：
1，安装node.js. 命令行窗口 输入 node -v 查看版本号。
2，命令行窗口 输入 node 《刚刚创建的01.js的全路径》  即可在控制台输出内容。

交互模式： 
命令行输入 node 回车
输入1+2 回车
3
ctrl + c 两次退出交互模式。或 .exit  退出。

语法规范：
区分大小写；每行结尾分号可不加；单行注释 // ，多行注释 /*  */ ；

-变量相关：

var 关键字定义变量 ：
var eid = 7，ename = ‘tom’；
输出：
console.log(eid,ename);

变量名命名规范：
可以包含字母、数字、下划线、美元符号$，不能以数字开头，
中文可以用作变量名。

声明变量未赋值，输出 undefined。

弱语言，可以多次赋不同类型的值。


-常量相关：

const 关键字定义常量：
const pi = 3.14;
必须赋初始值。不能重复赋值。


-数据类型相关：
ECMAScript:JavaScript的基本语法，由欧洲计算机制造商协会制定.
ECMAScript数据类型包括：原始类型和引用类型。
原始类型包括
number：数字
string：字符串
boolean：布尔
null：空
undefined：未定义
引用类型包括
Object:对象
Function：函数
Number：数字
String：字符串
Boolean：布尔
Date：日期
Error：错误
Array：数组
等等

typeof 关键字用法（判断类型）
var str = '2';
console.log(str, typeof str);
输出 ： 2 string

NaN = Not a Number 不是一个数字
NaN 和任何值运算，都反回NaN，不包括和字符串的相加。

console.log( Number(true) );//1
console.log( Number(null) );//0
console.log( Number(undefined) );//NaN


全等：===
-类型相同
-值相同

不全等：！==


创建函数：
函数声明： function fun(){}
函数表达式： var fun = function(){}


<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 初识 JavaScript 的不解  ](http://yuqianglianshou.com/2018/03/javascript/)  
<br/>