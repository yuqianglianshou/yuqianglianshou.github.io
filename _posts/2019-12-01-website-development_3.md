---
layout: post  
title: 网站开发_tomcat运行 
date: 2019-12-01  
tags:  技术
---
###  每个优秀的人，都有一段沉默的时光。 那段时光，是付出了很多努力，却得不到结果的日子，我们把它叫作扎根。 

## 一，本地tomcat安装（mac为例）  
请参考[Mac 下安装Tomcat](https://www.jianshu.com/p/db08d23049ce)  
 
## 二，本地tomcat运行war包  
将上篇文章中打好的sf-1.0.war复制到tomcat安装目录webapps下，然后重新启动tomcat，
![](/images/posts/websitedev/15.webp){:width="60%" height="60%"}  
输入访问地址 http://localhost:8080/sf-1.0/test/hello ,成功后的样子  
![](/images/posts/websitedev/16.webp){:width="60%" height="60%"}  

## 三，服务器部署
1. 服务器购买  
[阿里云服务器的购买操作流程](https://yq.aliyun.com/articles/280838)  
如果仅仅只是写几个接口玩的话，买最低配1核1G的就行，至于按流量付费还是包月包年自行选择，不得不说，真心贵啊，注意一些优惠信息，可以便宜很多很多。

1. 创建ECS实例  
[官方文档](https://help.aliyun.com/document_detail/25424.html)  

1. ForkLift 链接服务器   
ForkLift 是一款mac上专业的文件管理程序，我用它进行ftp链接，用了十几年的Windows，还是看到图形界面比较安心，详细介绍看知乎文章[Mac用户必备的FTP客户端](https://zhuanlan.zhihu.com/p/89461946)，通过ECS实例地址和密码登陆到远程服务器，
![](/images/posts/websitedev/17.webp){:width="60%" height="60%"} 

1. 服务器安装jdk和tomcat  
在下面的操作之前，你需要有些Linux知识储备，请看[后端程序员必备的Linux基础知识](https://github.com/Snailclimb/JavaGuide/blob/master/docs/operating-system/%E5%90%8E%E7%AB%AF%E7%A8%8B%E5%BA%8F%E5%91%98%E5%BF%85%E5%A4%87%E7%9A%84Linux%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.md)  

打开终端，通过命令 ssh root@服务器地址 ，链接服务器，下图登陆成功
![](/images/posts/websitedev/18.webp){:width="60%" height="60%"} 

根据上面储备的知识，分别将本地的jdk和tomcat安装包上传到服务器，然后解压，通过 ForkLift 看下成果。
![](/images/posts/websitedev/19.webp){:width="60%" height="60%"}  

1. 配置jdk环境变量  
[Linux服务器配置之JDK安装篇](https://www.jianshu.com/p/32575e8919f0)  

1. 服务器启动 tomcat，下图启动成功。
![](/images/posts/websitedev/20.webp){:width="60%" height="60%"} 
浏览器验证： http://你的服务器地址:8080/

1. 部署  
可以在ForkLift工具上直接将war包拖上去，图中我的war包改了名字，然后重新启动tomcat，
![](/images/posts/websitedev/21.webp){:width="60%" height="60%"} 
浏览器验证： http://你的服务器地址:8080/demo/test/hello，看下我的成果 [http://47.105.132.88:8080/demo/test/hello](http://47.105.132.88:8080/demo/test/hello)

## 至此，一个 hello World 接口完成了。不想总结了，睡了。

<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 网站开发_tomcat运行  ](http://yuqianglianshou.com/2019/12/website-development_3/)  
<br/>