---
layout: post  
title: Kotlin 爬个数据 
date: 2019-06-11  
tags:  技术
---
### 可能知道的多了，快乐就少了。  
 
1.    
学习 Kotlin 时，被它的爬虫项目实战吸引了，[https://lixiaojun.xin/static/courses/kotlin/](https://lixiaojun.xin/static/courses/kotlin/)，然而并没有看到demo实例，遂写之，[yuqianglianshou/KotlinParser](https://github.com/yuqianglianshou/KotlinParser) 。  
2.  
IDE:IntelliJ IDEA.  
网页解析库：compile 'org.jsoup:jsoup:1.12.1'  
IP地址代理服务：[旗云代理](http://www.qydaili.com/free/)  
爬取的目标网站：[http://quotes.toscrape.com/](http://quotes.toscrape.com/)  
3.  
主线：通过网页解析库jsoup获取旗云代理网页数据，提取前5页代理IP及端口号；随机取一个代理IP和端口号，获取目标网站前5页的数据，由于代理IP不稳定或响应时间长或网不好等等，会有失败情况甚至大量失败情况发生，程序重复此过程直至成功，然后提取我们想要的名人名言数据；输出到控制台；输出txt文件到项目根目录。   
4.    
![](/images/posts/kotlin_parser/1.png){:height="70%" width="70%"}   
![](/images/posts/kotlin_parser/2.png){:height="70%" width="70%"}   


<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Kotlin 爬个数据 ](http://yuqianglianshou.com/2019/06/kotlin_parser/)  
<br/>