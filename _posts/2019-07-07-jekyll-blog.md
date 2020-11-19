---
layout: post  
title: jkeyll 搭建博客 
date: 2019-07-07  
tags:  技术
---
### Just remember your name,no matter where you are in the world,I must and will go to see you.      --Miyamizu Mitsuha  


本文所要达到的效果：通过一个自己申请的域名，打开一个自己维护的博客。  
以下操作是在 mac 环境下，Windows 大同小异。    
所需条件：  
1，一个自己的域名，本例为 yuqianglianshou.com  
2，一个自己的 github 账号，本例我的账号是 yuqianglianshou  
3，vs code 工具会用    
4,Git, Ruby环境安装完毕。

1. 购买域名  
在阿里云旗下万网平台注册一个账号  [https://wanwang.aliyun.com/](https://wanwang.aliyun.com/)  或者 西部数码平台 [https://www.west.cn](https://www.west.cn)，以万网为例，打开链接，
![](/images/posts/jekyll_blog/wanwang1.png){:height="70%" width="70%"}   
<br/>
搜索想要的域名，没有被注册就可以花钱注册了，一般几块到几十每年，下单购买就好了。买好后先放着。

2. Jekyll 新建博客项目  
打开终端，进入到一个想要创建项目的目录（可以是临时目录，一会用完会删除）  
```
cd documents
cd github
```
新建项目(项目名字可以随意，myBlog)
```
jekyll new myBlog
```
新建执行完后用 vs code 打开项目，使用 command+shift+y 快捷键打开 vs code 的命令行 ,执行  
```
jekyll serve
```
当vs code 命令行中看到 Server address:http://127.0.0.1:4000  Server running 之后，打开浏览器，输入所给地址，即可看到刚刚建好的博客样例（一个简单的官方demo，需要改成我的 blog 这样的我会在写一篇文章）。
<br/>
![](/images/posts/jekyll_blog/image1.png){:height="70%" width="70%"}
<br/>

3. github 创建仓库  
登陆你的 github 账号，然后创建一个跟你账户名一样的仓库，如我的 github 账户名叫 yuqianglianshou，我的 github 仓库名就叫 yuqianglianshou.github.io。

4. 提交项目 myBlog 到github  
在GitHub创建的仓库上(yuqianglianshou.github.io) 点击 Clone or dowload 会出现一个地址(https://github.com/yuqianglianshou/yuqianglianshou.github.io.git )，copy这个地址备用。
打开终端，进入到你想要创建项目的位置(将来博客项目存放的位置)，执行
git clone https://github.com/yuqianglianshou/yuqianglianshou.github.io.git  
此时出现的文件夹（yuqianglianshou.github.io）就是你的GitHub上创建的项目了，然后把刚才建立的 myBlog 项目中的所有文件复制到你本地的 yuqianglianshou.github.io 仓库中（myBlog可以删了），然后提交到GitHub服务端，
终端进入仓库目录  
```
cd yuqianglianshou.github.io
git add .
git commit -m "初始化"
git push -u origin master 
``` 
提交成功后，在浏览器里输入 yuqianglianshou.github.io ，就可以访问你的博客了。此时的 yuqianglianshou.github.io 就相当于博客网站的域名。
5. 修改域名指向，域名解析  
登陆github账号，打开 yuqianglianshou.github.io 的项目，选择setting，找到
Custom domain
Custom domains allow you to serve your site from a domain other than yuqianglianshou.github.io. Learn more.
下面输入你买的域名，yuqianglianshou.com ,点击save。
<br/>
![](/images/posts/jekyll_blog/github.png){:height="70%" width="70%"} 
<br/>

登入阿里云（你购买域名的平台），域名后面点击解析，
<br/>
![](/images/posts/jekyll_blog/wanwang2.png){:height="70%" width="70%"} 
<br/>
添加记录，记录类型选择CNAME,主机记录填入www,解析路线默认，记录值 填入 yuqianglianshou.github.com ，TTL 默认值10分钟。保存，10分钟后就会生效。此时www.yuqianglianshou.com就可以使用了。
再次添加一个记录，将主机记录写为 @ ，其他与上一个一样，这样 直接 访问 yuqianglianshou.com 也可以了，（去掉了www）。
<br/>
![](/images/posts/jekyll_blog/wanwang3.png){:height="70%" width="70%"} 
<br/>
![](/images/posts/jekyll_blog/wanwang4.png){:height="70%" width="70%"} 
<br/>

至此，可以通过自己注册的域名访问自己的博客了。









<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ jkeyll 搭建博客 ](http://yuqianglianshou.com/2019/07/jekyll-blog/)  
<br/>