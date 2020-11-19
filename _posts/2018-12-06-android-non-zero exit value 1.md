---
layout: post  
title: Android 一个无法理解的 non-zero exit value 1  
date: 2018-12-06  
tags:  技术
---
### 醒来明月，醉时清风。  -- 元好问  

> <br/>
> 看下令人恶心的报错信息  Process 'command 'D:\sdk\build-tools\25.0.0\aapt.exe'' finished with non-zero exit value 1
> <br/>
> <br/>
![](/images/posts/android_non_zero_exit_value_1/error1.png){:height="70%" width="70%"}
> <br/>
> 
![](/images/posts/android_non_zero_exit_value_1/error2.png){:height="70%" width="70%"}
> <br/>
> <br/>
> 又是一个神奇的bug，我总是如此的幸运，以至于幸运女神已经对我爱答不理。  
> 又是搜罗了一堆此报错的原因，比如资源文件引用错误，资源命名格式错误，Build Tools Version 版本未选择，版本错误等等，全部一一检查试过，依然没解决问题。
> 我触发这个问题的环境：  
> 1，AS版本 3.2.1.   
> 2，导入他人的项目。   
> 3，是一个ionic混合开发项目，android部分。   
> 原代码是这样的，这是没问题的：   
> <br/>

```java
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="40dp"
        android:background="#aa363B41"
        android:paddingRight="12dp">

        <!--B 图标-->
        <ImageView
            android:id="@+id/iv_b"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:src="@mipmap/camera"/>

        <!--A 图标-->
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:layout_marginRight="16dp"
            android:layout_toLeftOf="@id/iv_b"
            android:src="@mipmap/flash_off"/>

    </RelativeLayout>
```
> 简单说下，一个 RelativeLayout 中放了两个图标，B 放在父布局的最右侧，A 放在B 的左侧，预览的视觉效果就是横向排列的    图标A 图标B，我是一个有点强迫症的选手，既然是 图标A 图标B 这样的，代码也要按这个顺序啊，于是顺手换了下位置，改成了这样的    
> <br/>

```java
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="40dp"
        android:background="#aa363B41"
        android:paddingRight="12dp">

        <!--A 图标-->
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:layout_marginRight="16dp"
            android:layout_toLeftOf="@id/iv_b"
            android:src="@mipmap/flash_off"/>

        <!--B 图标-->
        <ImageView
            android:id="@+id/iv_b"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:src="@mipmap/camera"/>


    </RelativeLayout>
```
> 这你妹的不可能有问题啊，继续加了其他功能布局，一运行，呵呵，出于对自己年龄的考虑，可能老了，犯了点低级错误吧，一点点看，没问题，一点点屏蔽写了的东西，调试，最后就剩这点改动了，还是报错，我勒个去，这点自信我还是有的，这不可能有问题啊，实在没招了，重新svn下载，另起文件夹运行，没问题！那就这点不一样了，于是我抱着试一试的完全不相信的态度换了回去，一运行，挖槽，成了！这这这。。。怎么可能，违背我多年的信仰啊！赶紧新建了个android项目，把相同的报错的代码导进去，运行，没问题！这就尴尬了，这个错只在这个项目里出现，我已有的知识体系已经无法说明这个问题了，问了一个哥们，哥们说可能是编译方式、过程啊啥的问题，并且说你把报错的那个android:layout_toLeftOf="@id/iv_b"  中@id 改为@+id 试试，我试试吧，确实就不报错了，哎，可怜了我整个上午的时光。
> <br/>
> ## 解决方案：  
> 一，把位置改回去。  
> 二，把 android:layout_toLeftOf="@id/iv_b"  改为 android:layout_toLeftOf="@+id/iv_b" 。  
> <br/>


<br/>
> 如果你按这样的方式解决了的话，呵呵，你是幸运的。  
<br/> 

转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android 一个无法理解的 non-zero exit value 1 ](http://yuqianglianshou.com/2018/12/android-non-zero-exit-value-1/)  