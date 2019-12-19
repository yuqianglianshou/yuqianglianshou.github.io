---
layout: post  
title: 网站开发_项目创建 
date: 2019-12-01  
tags:  技术
---
### 如果没有躺赢的命 那就站起来跑。 
## demo样例:  
[https://github.com/yuqianglianshou/WebsiteDemo](https://github.com/yuqianglianshou/WebsiteDemo)  

开发工具使用IntelliJ IDEA,官方下载地址
[https://www.jetbrains.com/idea/download/#section=mac](https://www.jetbrains.com/idea/download/#section=mac) ,
分为 Ultimate 和 Community 版，  
![](/images/posts/websitedev/1.png){:width="60%" height="60%"}    

Community是免费的但是是阉割版，创建不了web项目的，但是 Ultimate 版很贵！下面这个地址绝对良心，亲测有效，破解方法跟随idea版本走的，这意味着我们可以使用最新版本的idea
[https://www.jiweichengzhu.com/article/2940ed65c94f4671ae3f3aa72e168673](https://www.jiweichengzhu.com/article/2940ed65c94f4671ae3f3aa72e168673),
还是那句话，如果经济允许，建议购买正版。

## 项目创建：  
打开Idea，file -> new -> project，弹窗如下图  
![](/images/posts/websitedev/2.png){:width="60%" height="60%"}  

选择Spring Initializr,然后右下角Next，弹窗如下图  
![](/images/posts/websitedev/3.png){:width="60%" height="60%"} 

Group 和 Artifact 组合起来就是包名,即最下行Package，自行命名。弹窗如下图  
![](/images/posts/websitedev/4.png){:width="60%" height="60%"} 

选择 Web ,勾选下面的 Spring Web ,可以看到这个窗口里有大量的可选择选项，我是真不知都干什么用的。。。然后右下角Next，弹窗如下图  
![](/images/posts/websitedev/5.png){:width="60%" height="60%"}  

填写项目名字和位置，点击finish，一个 Spring Boot 项目初步建成。  
写一个测试类，不多说，如下：  
![](/images/posts/websitedev/6.png){:width="60%" height="60%"} 

指定一下程序端口号，默认为8080，这里修改为8333，目的是为了一会本地部署tomcat启动时不与之冲突，如下：  
![](/images/posts/websitedev/7.png){:width="60%" height="60%"} 

点击idea右上绿色小箭头，运行程序，然后浏览器输入 http://localhost:8333/test/hello ，如下   
![](/images/posts/websitedev/8.png){:width="60%" height="60%"} 



<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [ 网站开发_项目创建  ](http://xiongzhoudadi.com/2019/12/website-development_1/)  
<br/>