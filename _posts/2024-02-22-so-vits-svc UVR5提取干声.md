---
layout: post  
title: UVR5提取干声
date: 2024-02-22  
tags:  技术_AI语音
---
### 时间给出了答案。

一首音乐大多数由 人声（干声）+ 混响 + 和声 + 伴奏  组成，将各个部分分离。
 

1. 原曲分离为 伴奏 + 带和声混响的人声   
选项卡选择 method = MDX-Net，segment size = 512，overlap = 30，model = MDX23C-InstVoc HQ  
这一步最耗时，根据计算机性能不同，可能需要十几分钟或几十分钟。  
    <br/>
    ![](/images/posts/20240221/9.webp){:width="80%"}  
    <br/>
2. 带和声混响的人声分离为 和声 + 混响人声  
选项卡选择 method = VR Architecture，window size = 320，aggression setting = 8，  
model = 5_HP-Karaoke-UVR(激进)\model = 6_HP-Karaoke-UVR(平滑)  
（注：图中选择了Vocals Only,表示舍弃了和声，请取消勾选，将会得到和声文件）  
    <br/>
    ![](/images/posts/20240221/a.webp){:width="80%"}  
    <br/>
3. 混响人声分离混响   
选项卡选择 method = VR Architecture，window size = 320，aggression setting = 8， 
model = UVR-De-Echo-Normal，最后得到文件即为人声文件。  
（注：图中选择了No Echo Only，表示只需要没有混响的部分。取消勾选，将会得到混响文件）  
    <br/>
    ![](/images/posts/20240221/b.webp){:width="80%"}  
    <br/>

4. 如果最后的人声文件还存在明显的噪声，再选择 model = UVR-DeNoice去噪。  

经过处理后最终得到 伴奏 + （和声，未勾选Vocals Only ） + （混响，未勾选No Echo Only） + 干声。



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