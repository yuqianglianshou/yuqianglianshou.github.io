---
layout: post  
title: GPT-SoVITS 执行笔记
date: 2024-08-09  
tags:  技术_AI语音
---
### 我追不上以前那个，闪闪发光的自己了。

## 效果展示 

[【AI 语音-雪糕公主】 遗憾](https://www.bilibili.com/video/BV1hS411w7rG/?spm_id_from=333.999.0.0&vd_source=98a6ce1d2586467c3641a8b5aac049ed)  
[【AI 语音-罗翔老师】 遗憾](https://www.bilibili.com/video/BV19M4m1y7Sb/?spm_id_from=333.788&vd_source=98a6ce1d2586467c3641a8b5aac049ed) 

## 视频演示

[【GPTSoVits 语音克隆项目】（一）推理演示、效果对比](https://www.bilibili.com/video/BV1NjYheuEqJ/?spm_id_from=333.999.0.0&vd_source=98a6ce1d2586467c3641a8b5aac049ed) 

## 代码的下载与配置

GPT-SoVITS 项目地址： [https://github.com/RVC-Boss/GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)   

1，下载代码 ： https://github.com/RVC-Boss/GPT-SoVITS

2，创建conda环境并启用：

conda create -n GPTSoVits python=3.9
conda activate GPTSoVits

3，安装依赖：  pip install -r requirements.txt

4，下载需要文件并放好位置： 

ffmpeg.exe 放置在 GPT-SoVITS 根目录下：https://huggingface.co/lj1995/VoiceConversionWebUI/blob/main/ffmpeg.exe
ffprobe.exe 放置在 GPT-SoVITS 根目录下：https://huggingface.co/lj1995/VoiceConversionWebUI/blob/main/ffprobe.exe

下载预训练模型，并将它们放置在 GPT_SoVITS\pretrained_models 中：https://huggingface.co/lj1995/GPT-SoVITS/tree/main

5,pytorch 下载：https://pytorch.org/get-started/locally/

pip install torch==2.3.0 torchvision==0.18.0 torchaudio==2.3.0 --index-url https://download.pytorch.org/whl/cu118
注：这里指定了torch = 2.3.0 版本，默认安装的版本是2.4.0，训练模型时会报错：SystemError: initialization of _internal failed without raising an exception

## 关于 问题、建议

1. 推理长语句自行做好分段，否则会有丢字或丢句的问题。
2. 如果训练集干声不那么纯粹、干净，合成出来的语音会伴有电音，训练集越差，电音越明显，高音尤为明显。不那么差的情况下，可以多合成几次，选出来少好一些的，然后进行降噪处理。  





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