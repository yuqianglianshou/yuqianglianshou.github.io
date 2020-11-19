---
layout: post  
title: ionic 项目 运行 ionic serve（Windows） 
date: 2019-07-04  
tags:  技术
---
### 最好的礼物，做自己。  
 
1. 下载node  
nodejs 下载页面 [https://nodejs.org/download/release/](https://nodejs.org/download/release/) ，选择一个版本，比如我的选择是 v11.14.0,点进去，选择 node-v11.14.0-win-x64.zip 下载，直通车[https://nodejs.org/download/release/v11.14.0/node-v11.14.0-win-x64.zip](https://nodejs.org/download/release/v11.14.0/node-v11.14.0-win-x64.zip) 
解压到你的程序目录，比如我的是D:/ProgramFiles/nodejs,此时若打开cmd进入到当前D:/ProgramFiles/nodejs目录，输入
```node -v ```回车，```npm -v ```都会有版本信息。
2. 配置 npm 环境变量  
打开环境变量配置，新建系统变量 NPM_HOME =  D:/ProgramFiles/nodejs  
系统变量 path 追加 ``` ;%NPM_HOME% ``` (注意有一分号)  
重新打开新的cmd窗口（注意：环境变量修改需重新开启cmd生效），执行 ```node -v``` 出现版本信息，配置成功。  
3. 安装 ionic、cordova、node-sass   
命令行执行 
```
 npm install -g ionic  
```
-g 代表全局安装，一定要有 -g，不然会在你当前cmd所在的目录生成一个node-modules文件夹，经测试并无任何卵用。这时由于第一次执行或者网络问题会安装失败，再次执行安装命令。安装成功后 D:/ProgramFiles/nodejs/ 下 多出 ionic 和 ionic.cmd 两个文件，D:/ProgramFiles/nodejs/node_modules/ 下 多出 ionic 文件夹，执行 ```ionic -v``` 查看版本信息。同理执行
``` 
npm install -g cordova 
```
安装Cordova，```cordova -v ```查看版本，
```
npm install -g node-sass 
```
安装 node-sass,```node-sass -v``` 查看版本。
4. VSCode打开项目，终端执行ionic serve 报错    
```
ionic-app-scripts has unexpectedly closed (exit code 1).  
The Ionic CLI will exit. Please check any output above for error details.  
```
终端执行 
```
npm install @ionic/app-scripts@latest --save-dev  
```
如果中间出现 EXIST app-scripts 的错误，需要进入到项目目录，找到 node-modules/.bin/ionic-app-scripts 文件，删除，找到node-modules/@ionic/app-scripts 文件夹，删除，然后再次执行 npm install @ionic/app-scripts@latest --save-dev ，安装成功。  
5.    
到这基本差不多了，执行  
```npm install  ```
如果没报错，执行   
```ionic serve  ```
浏览器成功打开项目。
6. 附图  

![](/images/posts/ionicserve/downloadnodejs.png){:height="70%" width="50%"}   
<br/> 
<br/> 
![](/images/posts/ionicserve/2.png){:height="70%" width="70%"} 
<br/> 
<br/> 
![](/images/posts/ionicserve/3.png){:height="70%" width="70%"} 



<br/> 
<br/> 
<br/> 
<br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ ionic 项目 运行 ionic serve（Windows） ](http://yuqianglianshou.com/2019/07/ionic-serve/)  
> <br/>