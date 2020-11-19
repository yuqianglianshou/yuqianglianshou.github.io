---
layout: post  
title: Android实现小视频的录制和预览，界面和功能靠拢微信。 
date: 2019-05-21  
tags:  技术
---
### 不过是看淡利益，看穿时间，推己及人。  
 
先看一下效果图： 
<br/> 
<br/> 
![](/images/posts/record_video/recordvideo2.jpeg){:height="40%" width="40%"}   
<br/> 
![](/images/posts/record_video/recordvideo1.jpeg){:height="40%" width="40%"}   
<br/> 
![](/images/posts/record_video/recordvideo3.jpeg){:height="40%" width="40%"}   
<br/> 
<br/> 


1，实现的功能  

a)全屏幕预览录制播放。  
b)录制时间可定制（本实例15秒），录制按钮动画效果。  
c)录制完成即刻播放，可保存删除文件。  
d)录制按钮可以随意拖动复位。

2，可拓展的功能

a)可添加点击拍照功能。  
b)可添加开关闪关灯功能。  
c)对焦功能。（缺陷）  
d)可添加播放暂停功能。  
e)可分段录制，拼接视屏。  

3，未实现的微信效果

a)录制视频时，拖动录制按钮实现焦距调整。  
b)视频压缩。  

4，注意事项

a)本例以goole官方Camera2视频录制demo为原型修改，链接如下  
 [googlesamples/android-Camera2Video](https://github.com/googlesamples/android-Camera2Video)  
 API Camera2,minSdkVersion 21，支持5.0以上。  
b)自定义view 录制button 摘自
[Zhaoss/WeiXinRecordedDemo](https://github.com/Zhaoss/WeiXinRecordedDemo)  
此实例是基于ffmpeg的视频录制编辑，功能很强大，但是其中的 libutility.so 年代过于久远，android6.0以上启动调用时会给出 
Detected problems with app native libraries (please consult log for detail):libutility.so:text relocations  这个错误提示，是由于 .so 包的问题，作者表示解决不了，我去官网查过，好多年没有更新维护的动态了。但是关闭错误的dialog是可以使用的，视频的拼接 涂鸦 压缩 等等都是支持的。  
c)SurfaceView尺寸、Previewsize 、Picturesize 的选择方式。原则是比例一致，选择屏幕尺寸大小，期间有一些问题，demo中有详细注释。  

5，demo github 链接  
[yuqianglianshou/RecordVideoDemo](https://github.com/yuqianglianshou/RecordVideoDemo)




<br/> 
<br/> 
<br/> 
<br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android实现小视频的录制和预览，界面和功能靠拢微信。 ](http://yuqianglianshou.com/2019/05/record_view/)  
> <br/>