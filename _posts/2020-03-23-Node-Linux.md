---
layout: post  
title: Linux 基本命令
date: 2020-03-23  
tags:  笔记
---
### 一箪食，一瓢饮，居陋巷，人不堪其忧，回也不改其乐也。


```
su     切换到root用户  

ip addr   查看内网IP  
ifconfig  查看内网IP  

curl cip.cc             查看公网IP信息  
curl ifconfig.me/all    查看公网IP信息  

pwd     显示当前正在使用的目录  

# ls命令：这是一个非常有用的查看文件与目录的命令，list之意。
ls       列出当前目录下文件  
ls -a    列出全部的文件，连同隐藏文件（开头为.的文件）一起列出来  
ls -l    显示文件和目录的详细资料  

# cd命令：这是一个非常基本，也是大家经常需要使用的命令，它用于切换当前目录，它的参数是要切换到的目录的路径，可以是绝对路径，也可以是相对路径。
cd /home 　  进入根目录下面的home目录  
cd home 　   进入当前目录下的home目录  
cd ..　　　   返回上一层目录  
cd ../.. 　　 返回上两级目录  
cd /　　　　　 返回跟目录  
cd - 　　　　  返回上次所在的目录  

# mkdir命令：创建
mkdir dir1          创建一个叫做 'dir1' 的目录'  
mkdir dir1 dir2     同时创建两个目录   

# rm命令：删除
rm -f file1　　      删除一个叫做 'file1' 的文件'   
rmdir dir1 　　      删除一个叫做 'dir1' 的目录' （空目录才能删除）  
rm -rf dir1 　　     删除一个叫做 'dir1' 的目录并同时删除其内容   
rm -rf dir1 dir2　　 同时删除两个目录及它们的内容   

# mv命令：该命令用于移动文件、目录或更名，move之意，它的常用参数如下：-f 如果目标文件已经存在，不会询问而直接覆盖。
mv file1 file2       把文件file1重命名为file2   
mv file1 file2 dir   把文件file1、file2移动到目录dir中  

# cp命令：该命令用于复制文件，copy之意，它还可以把多个文件一次性地复制到一个目录下， 它的常用参数如下：
cp  -a file1 file2    连同文件的所有特性把文件file1复制成文件file2  
cp dir/* .            复制一个目录下的所有文件到当前工作目录   
cp -a /tmp/dir1 .     复制一个目录到当前工作目录   
cp -a dir1 dir2       复制一个目录  

# find命令：find是一个基于查找的功能非常强大的命令
find / -name file1                  从 '/' 开始进入根文件系统搜索文件和目录   
find / -user user1                  搜索属于用户 'user1' 的文件和目录   
find /home/user1 -name \*.bin       在目录 '/ home/user1' 中搜索带有'.bin' 结尾的文件   
find /usr/bin -type f -atime +100   搜索在过去100天内未被使用过的执行文件   
find /usr/bin -type f -mtime -10    搜索在10天内被创建或者修改过的文件   

压缩：tar -jcv -f filename.tar.bz2 要被处理的文件或目录名称  
查询：tar -jtv -f filename.tar.bz2  
解压：tar -jxv -f filename.tar.bz2 -C 欲解压缩的目录  

arch                  显示机器的处理器架构(1) 
uname -m              显示机器的处理器架构(2) 
uname -r              显示正在使用的内核版本 
dmidecode -q          显示硬件系统部件 - (SMBIOS / DMI) 
hdparm -i /dev/hda    罗列一个磁盘的架构特性 
hdparm -tT /dev/sda   在磁盘上执行测试性读取操作 
cat /proc/cpuinfo     显示CPU info的信息 
cat /proc/interrupts  显示中断 
cat /proc/meminfo     校验内存使用 
cat /proc/swaps       显示哪些swap被使用 
cat /proc/version     显示内核的版本 
cat /proc/net/dev     显示网络适配器及统计 
cat /proc/mounts      显示已加载的文件系统 
lspci -tv             罗列 PCI 设备 
lsusb -tv             显示 USB 设备 
date                  显示系统日期 
```

<br/>
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Linux 基本命令 ](http://yuqianglianshou.com/2020/03/Node-Linux/)  
<br/>