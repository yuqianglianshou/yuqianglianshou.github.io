---
layout: post  
title: 不蒜子失效   
date: 2018-11-04  
tags:  技术
---
### 清扬 婉兮  

<br/>
突然发现静态网页计数器不蒜子失效了，进入官网找到原因：  
因七牛强制过期『dn-lbstatics.qbox.me』域名，与客服沟通无果，只能更换域名到『busuanzi.ibruce.info』！  
需要将页面中的  
```java
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>  
```
修改为  
```java
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>  
```
就好了。  
[不蒜子链接](http://busuanzi.ibruce.info/)

<br/>  


转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 不蒜子失效 ](http://yuqianglianshou.com/2018/11/blog-busuanzi/)  