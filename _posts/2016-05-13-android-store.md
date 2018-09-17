---
layout: post  
title: Android下的存储目录   
date: 2016-05-13  
tags:  技术
---
### 某篇博客上摘抄的，记录下 

#### Android 平台的存储目录

<br/>
![](/images/posts/android_store/store.png)
<br/>
#### 内部存储  
data文件夹就是我们常说的内部存储，对于没有root的手机来说，我们是没有权限打开这个文件夹的但是可以访问到。
#### 外部存储  
外部存储才是我们平时操作最多的，外部存储一般就是我们上面看到的storage文件夹，当然也有可能是mnt文件夹，这个名称不影响我们操作数据。  
#### 路径获取  

```java  
内部存储：  
 getFilesDir();//获取内部存储的File路径 getCacheDir();//获取内部存储的Cache路径 getDatabasePath("demo.db");//获取database路径 getSharedPreferences("demo",MODE_PRIVATE);//获取SP  

外部存储：  
 getExternalCacheDir();//获取外部存储私有目录
 getExternalFilesDir(Environment.DIRECTORY_DCIM);//获取外部存储公有目录  


```
  
#### 清除缓存/清除数据
##### 清除缓存： 
缓存是程序运行时的临时存储空间，它可以存放从网络下载的临时图片，从用户的角度出发清除缓存对用户并没有太大的影响，但是清除缓存后用户再次使用该APP时，由于本地缓存已经被清理，所有的数据需要重新从网络上获取，注意：为了在清除缓存的时候能够正常清除与应用相关的缓存，请将缓存文件存放在getCacheDir()或者 getExternalCacheDir()路径下。  
##### 清除数据：
清除用户配置，比如SharedPreferences、数据库等等，这些数据都是在程序运行过程中保存的用户配置信息，清除数据后，下次进入程序就和第一次进入程序时一样。  
 
<br/>

<br/>
<br/>
<br/>
<br/>


转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [  Android下的存储目录   ](http://xiongzhoudadi.com/2016/05/android-store/)  