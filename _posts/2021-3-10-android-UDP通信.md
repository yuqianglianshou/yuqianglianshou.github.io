---
layout: post  
title: Android UDP通信
date: 2021-03-10  
tags:  技术
---
### 清风不识字，何故翻书页。
<br/> 

本程序代码 [https://github.com/yuqianglianshou/Socket](https://github.com/yuqianglianshou/Socket)  

以VSCode方式打开代码 [https://github1s.com/yuqianglianshou/Socket](https://github1s.com/yuqianglianshou/Socket)  

目的效果：
局域网下客户端向服务端发送消息，实现局域网内发现服务器，向服务器发消息的功能。

原理：  

服务端：  
1. 向指定端口循环发送广播信息，信息具有标识自己是服务端的作用即可。  
2. 监听指定端口号的socket连接。


客户端：
1. 监听广播消息，收到服务端发来的消息，解析出服务端IP地址。
2. 拿到服务端地址和服务端指定的端口号，建立udp连接通信，实现客户端给服务端发消息。

具体原理可以看这篇 [ 局域网内组网通讯的实现 ](http://yuqianglianshou.com/2020/11/android_websocket/)  
它是 websocket 实现的，而这篇是UDP实现，本质是一样的。






<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android UDP通信 ](http://yuqianglianshou.com/2021/03/android-UDP通信/)  
<br/>