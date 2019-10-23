---
layout: post  
title: git 提交代码到GitHub报错 
date: 2019-10-17  
tags:  技术
---
### 劝君立足眼前事，荆棘丛中也开花。  

qingyang:###.github.io liuqiang$ git push -u origin master
remote: Permission to ###/###.github.io.git denied to ###.
fatal: unable to access 'https://github.com/####/###.github.io.git/': The requested URL returned error: 403

原因是我之前一直用GitHub的A账号登陆提交代码到A的，现在我又申请了一个B账号，打算提交到B账号，
你修改了git仓库的用户名和密码，导致你内存和硬盘中缓存的账号密码不能使用

1、执行git config --list，查看git的配置信息
图中红色部分内容[user] 为你的git账号配置信息，[credential]为你的这些信息存储位置

2、执行vim .git-credentials，查看credential中缓存的账户





<br/> 
<br/> 
<br/> 
<br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [ git 提交代码到GitHub报错  ](http://xiongzhoudadi.com/2019/10/git-commit-error/)  
> <br/>