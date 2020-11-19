---
layout: post  
title: Android 图片放错位置无所谓？
date: 2020-05-03  
tags:  技术
---
### 孤独是生命的本质，不，是你的本质。  


我曾今写过这个问题：
***图片放错目录会产生的问题吗？***  
并给出了（摘抄了）如下答案:  
这一点可能很多人都不会注意，觉得只要往一个drawable目录中放了需要的资源就好了。而我们可以自己做一个简单的测试，把同一个图片资源放在不同的dpi目录，会发现它们使用的内存是不一样的。简单说就是高密度（density）的系统去使用低密度目录下的图片资源时，会将图片长宽自动放大以去适应高密度的精度，当然图片占用的内存会更大。  

所以如果能提各种dpi的对应资源那是最好，可以达到较好内存使用效果。如果提供的图片资源有限，那么图片资源应该尽量放在高密度文件夹下，这样可以节省图片的内存开支。  
其实多年来我也并未当回事，今天我来验证一下到底有多大影响？！  
1. 新建项目。
2. 准备一张图片,大小为 889*1080 311.83kB,分别放入如下5个drawable目录，取名与之对应，如下图所示  
<br/>
<br/>
![](/images/posts/drawable_lacation/drawable1.png)
<br/>
3. 在布局文件中以背景使用此图片，第一次使用drawable目录下的图，如下图   
<br/>
<br/>
![](/images/posts/drawable_lacation/drawable2.png)  
<br/>
4. 运行程序，打开Profiler,看下内存使用情况，如下图：   
<br/>
<br/>
![](/images/posts/drawable_lacation/drawable3.png)  
<br/>
5. 更改布局背景使用的图片，这次使用drawable_hdpi,再次运行观看内存使用情况  
<br/>
<br/>
![](/images/posts/drawable_lacation/drawableh.png)  
<br/>
6. drawable_xhdpi  
<br/>
![](/images/posts/drawable_lacation/drawablexh.png)  
<br/>
7. drawable_xxhdpi  
<br/>
![](/images/posts/drawable_lacation/drawablexxh.png)  
<br/>
8. drawable_xxxhdpi  
<br/>
![](/images/posts/drawable_lacation/drawablexxxh.png)  
<br/>

***整理数据如下：***
<br/>

目录  |	Total(MB) | Graphics(MB)  
:-: | :-: 
drawable           |	99.6  |  43.4
drawable-hdpi      |	93.8  |  40.1
drawable-xhdpi     |	72.4  |  29.8
drawable-xxhdpi    |	78.2  |  29
drawable-xxxhdpi   |	59.1  |  18


另外发现了一个问题，相同的程序每次运行，Profiler 中显示的内存使用情况是不同的，有时差别甚至很大，所以，以上数据仅供参考。  

最终结果：这张不是很大的图片如果放错目录，多则影响到了近20M的内存，所以如果图片很大或者很多，内存影响还是不容小觑的，正确的开发习惯很重要。
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android 图片放错位置无所谓？ ](http://yuqianglianshou.com/2020/05/android_drawable/)  
<br/>