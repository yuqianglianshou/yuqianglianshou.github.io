---
layout: post  
title: Linux 基本命令
date: 2020-03-23  
tags:  笔记
---
### 一箪食，一瓢饮，居陋巷，人不堪其忧，回也不改其乐也。


```
su     使用其它用户身份  （substitute user）  
sudo   使用其它身份执行命令，预设身份root，密码有效期5分钟  
若未经授权的用户企图使用sudo，则会发出警告邮件给管理员。  
su 用户名      切换用户。  
su - 用户名    切换用户，并且切换到用户的家目录（ - 的意义 ）。exit，退出当前用户，回到上一个用户,如果有。  

ip addr   查看内网IP  
ifconfig  查看内网IP  

curl cip.cc             查看公网IP信息  
curl ifconfig.me/all    查看公网IP信息  

pwd     显示当前正在使用的目录 （print work directory） 

touch [文件名]    如果文件不存在，创建文件  

command --help   显示command命令的帮助信息  

man command      查阅command命令的使用手册 （man = manual）  

cat [文件名]      查看文件内容（-b 显示非空行号； -n 显示行号，包括空行。）  
more [文件名]     查看文件内容，只显示一屏；Enter 显示下一行，空格 显示下一屏，q 退出查看。  

模式查找  
grep -n abc readme.txt  搜索readme.txt中所有包含abc的行，（-n 显示匹配文本的行号；-i 忽略大小写；-v 显示不包含匹配文本的行。）  

echo [字符串]   会在终端输出当前字符串，通常配合其它命令使用  （发音 ai kou）

重定向 > 和 >>   将本应在终端输出的内容 输出/追加 到指定文件中  
> 表示输出，会覆盖原有内容。  
>> 表示追加，将内容追加到末尾。  

管道 ｜   ：一个命令的输出可以通过管道作为另一个命令的输出。  

实例：  
echo hello world > a.txt  将 hello world 覆盖写入到了文件a.txt中。  
echo hello world >> a.txt  将 hello world 追加到了文件a.txt中。  
ls -lh >> a.txt  将 当前文件夹信息追加到了a.txt中。  
ls -lh | more  将结果分屏显示  
ls -lh | grep abc  在结果中查询包含abc的数据  

chmod 可以修改 用户/组 对 文件/目录 的权限  
chmod +/-rwx 文件/目录  
chmod -R 755 文件/目录  递归修改文件权限（7，5，5  拥有者，组用户，其他用户）  

# ls命令：这是一个非常有用的查看文件与目录的命令，list之意。
ls       列出当前目录下文件  
ls -a    列出全部的文件，连同隐藏文件（开头为.的文件）一起列出来  
ls -l    显示文件和目录的详细资料   
ls -lh   文件大小更人性化显示  

# cd命令：这是一个非常基本，也是大家经常需要使用的命令，它用于切换当前目录，它的参数是要切换到的目录的路径，可以是绝对路径，也可以是相对路径。
(change directory)
cd /home 　  进入根目录下面的home目录  
cd home 　   进入当前目录下的home目录  
cd ..　　　   返回上一层目录  
cd ../.. 　　 返回上两级目录  
cd /　　　　　 返回跟目录  
cd - 　　　　  返回上次所在的目录  

# mkdir命令：创建
mkdir dir1          创建一个叫做 'dir1' 的目录'  
mkdir dir1 dir2     同时创建两个目录   
mkdir -p dir1/dir2/dir3   创建层级目录  

# rm命令：删除，不进入回收站
-r 递归删除； -f 强制删除。  
rm -f file1　　      删除一个叫做 'file1' 的文件'   
rmdir dir1 　　      删除一个叫做 'dir1' 的目录' （空目录才能删除）  
rm -rf dir1 　　     删除一个叫做 'dir1' 的目录并同时删除其内容   
rm -rf dir1 dir2　　 同时删除两个目录及它们的内容   

# mv命令：该命令用于移动文件、目录或更名，move之意，它的常用参数如下：-f 如果目标文件已经存在，不会询问而直接覆盖。
mv file1 file2       把文件file1重命名为file2   
mv file1 file2 dir   把文件file1、file2移动到目录dir中  

# cp命令：该命令用于复制文件，copy之意，它还可以把多个文件一次性地复制到一个目录下， 它的常用参数如下：
-i 如果文件发生覆盖情况，会给出提示。  
-r 递归复制目录。    
cp  -a file1 file2    连同文件的所有特性把文件file1复制成文件file2  
cp dir/* .            复制一个目录下的所有文件到当前工作目录   
cp -a /tmp/dir1 .     复制一个目录到当前工作目录   
cp -a dir1 dir2       复制一个目录  

# find命令：find是一个基于查找的功能非常强大的命令
find / -name file1                  从 '/' 开始进入根文件系统搜索文件和目录   
find / -user user1                  搜索属于用户 'user1' 的文件和目录   
find /home/user1 -name "*.bin"       在目录 '/ home/user1' 中搜索带有'.bin' 结尾的文件   
find /usr/bin -type f -atime +100   搜索在过去100天内未被使用过的执行文件   
find /usr/bin -type f -mtime -10    搜索在10天内被创建或者修改过的文件   

# 打包压缩：  
windows 常用 rar，mac 常用 zip，linux 常用 tar.gz.  

打包文件：  
tar -cvf 打包文件.tar 被打包文件/路径   
e.g.: tar -cvf txt.tar 01.txt 02.txt 03.txt
解包： 
tar -xvf 打包文件.tar  会解包到当前文件夹  

压缩、解压缩 gzip:  
压缩：tar -zcvf 打包文件.tar.gz 被打包文件/路径  
解压：tar -zxvf  打包文件.tar.gz -C 解压路径

压缩、解压缩 bzip2(读音two):  
压缩：tar -jcvf 打包文件.tar.bz2 被打包文件/路径  
解压：tar -jxvf  打包文件.tar.bz2 -C 解压路径


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
cal                   显示日历，-y 查看一年的日历  
df -h                 显示剩余磁盘空间  disk free  
du -h                 显示目录下文件大小  disk usage  


# apt 软件安装卸载  
Advanced Packaging Tool。 linux 下的一款安装包管理工具。   
sudo apt install 软件包
sudo apt remove 软件名  
sudo apt upgrade   更新已经安装的软件包  

# 终端编辑器 vi  vim  （visual interface）
vi 文件名  
三种模式： 命令模式  编辑模式  末行模式  
1，打开文件即进入命令模式。
2，i键进入编辑模式，esc退出编辑模式。
3，：键进入末行模式，esc退出末行模式。
4，末行模式下，w保存；q退出；q！强制退出，不保存；wq保存并退出；x保存并退出。
5，编辑模式操作命令：
   hjkl  左下上右 移动。
   gg 文件顶部；G 文件底部；数字gg   移动到数字对应的行数。
   Ctrl+b 向上翻页。
   Ctrl+f 向下翻页。
   H 屏幕顶部。
   M 屏幕中间。
   L 屏幕底部。
   
   选中文本： v字符选中；  V行选中；Ctrl+v 块状代码选中； 
   u  撤销操作；Ctrl+r 恢复撤销。
   dd 删除行，ndd 删除多行；D删除至行尾。x删除选中。d删除移动命令对应内容。
   y 复制；yy 复制行，nyy 复制多行；p 粘贴。  
   /字符  查找，n 下一个，N 上一个。

   ：w 文件名  文件另存为。
   ：n 文件名  新建文件。



```

<br/>
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Linux 基本命令 ](http://yuqianglianshou.com/2020/03/node_linux/)  
<br/>