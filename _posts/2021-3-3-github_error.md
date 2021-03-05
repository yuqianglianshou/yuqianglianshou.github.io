---
layout: post  
title: 问题解决：Failed to connect to github.com port 443：Operation timed out
date: 2021-03-03  
tags:  技术
---
### 大雨一下子就淋湿了我的全身，我在雨中已经没有任何体面可言。
<br/> 

北京三月的天气忽冷忽热，实在琢磨不透，像极了我的心情。  
想往 GitHub 上提交点文件，结果无论 push 还是 pull 都报错了。  
push报  Failed to connect to github.com port 443: Timed out 错误，  
pull报  Error in the HTTP2 framing layer 错误，   
一天故事的开端变成了事故的开端。  
查了百度，基本都是在说代理问题，解决方案都是git命令，要不就是修改系统文件。  
对于一个懒人来说，这些操作明显是多了，既然是代理问题，那就好办了，我这开代理的就一个地方，翻墙小飞机，再次打开小飞机，再关闭，哈哈，问题解决。  
其实出现这个问题的原因很简单，开了小飞机，没有正常关闭，比如直接系统结束进程或直接关机，造成小飞机开代理写入的文件没有归位。再让他正常启动关闭一次就好。  
如此而已。








<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 问题解决：Failed to connect to github.com port 443: Operation timed out ](http://yuqianglianshou.com/2021/03/github_error/)  
<br/>