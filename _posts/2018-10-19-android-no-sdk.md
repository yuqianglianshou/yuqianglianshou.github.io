---
layout: post  
title: Android 一个无法理解的 Please select Android SDK   
date: 2018-10-19  
tags:  技术
---
### 我抬头仰望星空，划过一颗流星，我闭上眼，睡了。  

>Error:Please select Android SDK  
> <br/>
> 接手的一个移动的项目，先看下令人恶心的报错界面。
> <br/>
> <br/>
![](/images/posts/android_nosdk/1.jpg){:height="70%" width="70%"}
> <br/>
> 
> 事实上报这个错很明显的原因是SDK路径没配置对，看下项目的SDK路径和你本地的SDK路径是否一致就好了，网上说明甚多，不解释。而我要说的是，如果你把百度甚至Google还有各种IT交流站点都用过了还没有解决的话，可以用我的方法一试，成不成看你的运气了。
> 我触发这个问题的环境：  
> 1，AS版本 3.0.1.   
> 2，导入他人的项目。   
> 3，是一个ionic混合开发项目。   
> 目录是这样的。  
<br/>
![](/images/posts/android_nosdk/path.jpg){:height="40%" width="40%"}
> <br/>
> <br/>
![](/images/posts/android_nosdk/path2.jpg){:height="40%" width="40%"}
> <br/>
> <br/>
![](/images/posts/android_nosdk/path3.jpg){:height="40%" width="40%"}
> <br/>
> <br/>
> ## 解决方案：  
> 第一步：删掉两个build目录，也许右键delete删不掉，请去文件夹下删除。  
> <br/>
![](/images/posts/android_nosdk/delete.jpg){:height="40%" width="40%"}
> <br/>
> 第二步：close 项目。
> <br/>
![](/images/posts/android_nosdk/close.jpg){:height="40%" width="40%"}
> <br/>
> 第三步：X掉这个项目，然后点击Open an existing Android Studio project 重新打开这个项目。  
> <br/>
![](/images/posts/android_nosdk/close2.jpg){:height="40%" width="40%"}
> <br/>
> 第四步：见证这无语的奇迹吧（如果幸运女神站在你那边的话）。  
> <br/>
![](/images/posts/android_nosdk/success.jpg){:height="40%" width="40%"}
> <br/>

<br/>
<br/>
> 如果你按这样的方式解决了的话，感谢感谢我吧，我和朋友调了整整一天，综合了网上各种方法，偶然间碰到的，原因未知，差点就卸载as重装了，事实上这样的话还是有问题，只要一改动build.gradle文件就坏了，还要重新再来一次上述操作，所以说这个方法并没有给出本质的解决方案，也没有找到问题的原因，只是试了能用了，并且说明下，这个项目在朋友的电脑上运行没问题的。所以，我觉得终极解决方案要卸了as重装一次吧，我暂且不试了，不说了，忙死了。
<br/>
<br/>  
> # 11月24号更新：  
>升级了最新版的AS，版本号3.2.1，问题不在出现，厉害了我的Android Studio 3.0.1。
>所以说有些说法比如卸了重新装是有一定道理滴。
<br/>
<br/> 

转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [ Android 一个无法理解的 Please select Android SDK ](http://xiongzhoudadi.com/2018/10/android-no-sdk/)  