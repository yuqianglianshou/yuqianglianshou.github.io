---
layout: post  
title: res目录-图片  
date: 2017-04-12  
tags: 技术  
---
### 读书，永远都不晚。  

***mipmap***
<br/>
在使用Android Studio（应该是从1.1版本开始）创建Android应用项目时，常常会看到系统把ic_launcher.png图标放在了mipmap-xxhdpi目录下了。那么这个mipmap是什么意思呢？和drawable的对应dpi目录有什么区别呢？  

我们知道，drawable文件夹是存放一些xml(如selector)和图片，Android会根据设备的屏幕密度(density)自动去对应的drawable文件夹匹配资源文件。  

那么mipmap这个目录有什么用呢？  

MIP来源于拉丁文中的multum in parvo，意为在一个小空间里的多数。MIP map(有时候拼写成mipmap)是一种电脑图形图像技术，用于在三维图像的二维代替物中达到立体感效应。  

Android对放在mipmap目录的图标会忽略屏幕密度，会去尽量匹配大一点的，然后系统自动对图片进行缩放，从而优化显示和节省资源（使用上面说的mipmap技术）。就目前的版本来说，mipmap也没有完全取代drawable的意思，为了更好的显示效果，官方建议如下类型的图片资源可以放到mipmap目录。  
、、、
Launcher icons.
Action bar and tab icons.
Notification icons
、、、

***drawable-nodpi文件夹***
<br/>
这个文件夹是一个密度无关的文件夹，放在这里的图片系统就不会对它进行自动缩放，原图片是多大就会实际展示多大。但是要注意一个加载的顺序，drawable-nodpi文件夹是在匹配密度文件夹和更高密度文件夹都找不到的情况下才会去这里查找图片的，因此放在drawable-nodpi文件夹里的图片通常情况下不建议再放到别的文件夹里面。  

***ICON尺寸***
<br/>

密度  |	建议尺寸  
:-: | :-: 
mipmap-mdpi  |	48 * 48  
mipmap-hdpi  |	72 * 72
mipmap-xhdpi  |	96 * 96
mipmap-xxhdpi  |	144 * 144
mipmap-xxxhdpi  |	192 * 192

***图片放错目录会产生的问题吗？***
<br/>
这一点可能很多人都不会注意，觉得只要往一个drawable目录中放了需要的资源就好了。而我们可以自己做一个简单的测试，把同一个图片资源放在不同的dpi目录，会发现它们使用的内存是不一样的。简单说就是高密度（density）的系统去使用低密度目录下的图片资源时，会将图片长宽自动放大以去适应高密度的精度，当然图片占用的内存会更大。  

所以如果能提各种dpi的对应资源那是最好，可以达到较好内存使用效果。如果提供的图片资源有限，那么图片资源应该尽量放在高密度文件夹下，这样可以节省图片的内存开支。  




<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ res目录-图片 ](http://yuqianglianshou.com/2017/04/android_res/)  
<br/>