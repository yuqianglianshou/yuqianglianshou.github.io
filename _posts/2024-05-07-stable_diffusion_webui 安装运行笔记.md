---
layout: post  
title: stable_diffusion_webui 安装运行笔记
date: 2024-05-07  
tags:  技术_AI绘画
---
### 我主张克制不了就放任。

项目地址：[https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

## 1. 安装 CUDA Toolkit

```
项目指定 CUDA Toolkit 版本 11.8 （必须，高低都不行，我12.0,12.1,12.4都试过！）注：NVIDIA 驱动版本与此无关，无需更改。    

cmd打开命令行，查看当前显卡支持版本
    nvidia-smi
如下图，我的显卡是4070Ti，当前最高可支持12.4版本，我们需要安装11.8版本，所以>=11.8即可。
```
<br/>
![](/images/posts/20240507/1.webp){:width="60%"}  
<br/>

```
查看当前系统正在使用的版本
    nvcc -V
如下图，我当前使用版本既是11.8，如果不是，请下载安装。
```

<br/>
![](/images/posts/20240507/4.webp){:width="80%"}  
<br/>

CUDA Toolkit 下载地址：[https://developer.nvidia.com/cuda-toolkit-archive](https://developer.nvidia.com/cuda-toolkit-archive)

<br/>
![](/images/posts/20240507/2.webp){:width="60%"}  
<br/>

点击版本11.8，选择符合当前系统的版本下载安装即可，比如我的是 windows 11。

<br/>
![](/images/posts/20240507/3.webp){:width="80%"}  
<br/>

```
安装完成使用 nvcc -V 验证是否成功。
```

## 2. 安装 cuDNN

```
安装与 CUDA Toolkit 11.8 匹配的cuDNN版本，这里选择作者推荐版本 
Download cuDNN v8.9.5 (October 27th, 2023), for CUDA 11.x  
下载压缩包
```
cuDNN 下载地址：[https://developer.nvidia.com/rdp/cudnn-archive](https://developer.nvidia.com/rdp/cudnn-archive)

<br/>
![](/images/posts/20240507/5.webp){:width="60%"}  
<br/>

解压后的文件  
<br/>
![](/images/posts/20240507/6.webp){:width="60%"}  
<br/>

复制这3个文件夹到 CUDA Toolkit 的安装目录中即可，
比如我的安装目录是 D:\NVIDIA\v11.8，可以发现CUDA Toolkit安装目录中也有这三个文件夹，复制过来，相同文件夹中的文件会合并。这种安装方式称之为 插入式安装。 

<br/>
![](/images/posts/20240507/7.webp){:width="60%"}  
<br/>



## 3. 安装 python环境

```
项目指定 python 版本 3.10.6 （必须，高低都不行）  
cmd打开命令行，查看系统python版本 
    python -V
如果不是：
方法1，卸载系统python，重新安装3.10.6版本的python。
方法2，使用conda创建一个python=3.10.6版本的虚拟环境。

我们使用第二种：
创建名称为 env_sd_webui 的虚拟环境 ： conda create -n env_sd_webui python=3.10.6

```

## 4. 下载代码

```
下载代码，执行
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

```

## 5. 修改配置文件

```
如果python使用方法2安装的，如下操作，如果使用方法1，跳过此步骤
修改webui-user.bat 文件：
打开代码，找到webui-user.bat 文件

```
<br/>
![](/images/posts/20240507/8.webp){:width="60%"}  
<br/>

```

修改 webui-user.bat文件，添加我们创建的python环境地址：

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=
-》
set PYTHON=D:\Anaconda\envs\env_sd_webui\python.exe
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=

```

## 6. 执行程序

```
双击  webui-user.bat 执行脚本。脚本执行时会在项目根路径下创建venv的环境，安装大量依赖包和sd的基础模型，下载量很大，需要十几分钟+。执行成功浏览器窗口自动打开，如下图：
```
<br/>
![](/images/posts/20240507/9.webp){:width="100%"}  
<br/>


<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 