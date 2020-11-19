---
layout: post  
title: Mac 系统上搭建ionic需要的环境变量配置 
date: 2019-04-30  
tags:  技术
---
### 很远，远到海枯以后，远到余生已逝。  
 
打开你的终端，输入如下命令，如果都存在，此文不必看了。  
echo $JAVA_HOME  
echo $ANDROID_HOME  
echo $GRADLE_HOME  
我的运行结果：  
qingyang:~ ling$ echo $JAVA_HOME  
/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home  
qingyang:~ ling$ echo $ANDROID_HOME   
/Volumes/D/androidSDK  
qingyang:~ ling$ echo $GRADLE_HOME  
/Volumes/D/gradleHome/gradle-3.3  
如果没有配置过，看到的都是空，那需要配置下了，不然ionic跑不通的。  

1，JAVA_HOME  

检测是否安装了java环境  
java -version  
我的版本：  
qingyang:~ ling$ java -version  
java version "1.8.0_211"  
Java(TM) SE Runtime Environment (build 1.8.0_211-b12)  
Java HotSpot(TM) 64-Bit Server VM (build 25.211-b12, mixed mode)  
没有则自行安装，下载地址 https://www.oracle.com/technetwork/java/javase/downloads/index.htm    
界面上选择  Java SE 8u211 / Java SE 8u212 （此时是19年4月份的版本） 这个样子的，DOWNLOAD 上是JDK，不是Oracle JDK，请注意。  

找到安装路径  
打开finder（访达），找到 资源库文件夹，资源库中寻找 Java文件夹，然后是 JavaVirtualMachines文件夹，打开出现你的jdk文件夹，我的是 jdk1.8.0_211.jdk；或者打开finder，快捷键command+shift+G,作用是快速打开文件路径，输入  /Library/Java/JavaVirtualMachines/ ，直接打开jdk的文件夹。记住你的文件夹，即你的jdk版本。  
然后终端输入  
open .bash_profile  
打开你的配置文件，如果之前不曾配置过环境变量，是一个空文本，如果没有创建过，执行  
touch .bash_profile  
创建一个。在打开的文件中添加如下文本   

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home  
PATH=$JAVA_HOME/bin:$PATH:.  
CLASSPATH=JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.  
export JAVA_HOME  
export PATH  
export CLASSPATH  

其中的 路径 jdk1.8.0_211.jdk 替换你自己的，command+S 保存下，  
终端输入  
source .bash_profile  
即可生效，验证下  
echo $JAVA_HOME  
结果  
qingyang:~ ling$ echo $JAVA_HOME  
/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home  

JAVA_HOME 配置完成。  

2，ANDROID_HOME  

自行找到自己的Android sdk保存路径，我的是 /Volumes/D/androidSDK。  
依然打开 .bash_profile 这个文件，没有关闭的继续编辑，在后面追加    

ANDROID_HOME=/Volumes/D/androidSDK  
export ANDROID_HOME  
export PATH=${PATH}:${ANDROID_HOME}/tools  
export PATH=${PATH}:${ANDROID_HOME}/platform-tools   

保存.bash_profile文件，终端验证  
source .bash_profile  
echo $ANDROID_HOME  

qingyang:~ ling$ echo $ANDROID_HOME  
/Volumes/D/androidSDK  

ANDROID_HOME 配置完成。  

3，GRADLE_HOME  

下载地址 https://gradle.org/releases/    
找到需要的版本，下载，解压，找一个目录，将解压后的文件粘贴过去，作为你的GRADLE_HOME，  
我放在了 /Volumes/D/gradleHome/gradle-3.3 这里。  
依然打开 .bash_profile 这个文件，没有关闭的继续编辑，在后面追加    

GRADLE_HOME=/Volumes/D/gradleHome/gradle-3.3  
export GRADLE_HOME  
export PATH=$PATH:$GRADLE_HOME/bin  

保存.bash_profile文件，终端验证  
source .bash_profile  
echo $GRADLE_HOME  

qingyang:~ ling$ echo $GRADLE_HOME   
/Volumes/D/gradleHome/gradle-3.3  

GRADLE_HOME 配置完成。  

至此，运行 ionic cordova build android 命令的环境变量妥了。然而后面的路还很长。。  

### 最终我的 .bash_profile 文件中的内容是这样的  

JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home  
PATH=$JAVA_HOME/bin:$PATH:.  
CLASSPATH=JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.  
export JAVA_HOME  
export PATH  
export CLASSPATH  


ANDROID_HOME=/Volumes/D/androidSDK  
export ANDROID_HOME  
export PATH=${PATH}:${ANDROID_HOME}/tools  
export PATH=${PATH}:${ANDROID_HOME}/platform-tools  

GRADLE_HOME=/Volumes/D/gradleHome/gradle-3.3  
export GRADLE_HOME  
export PATH=$PATH:$GRADLE_HOME/bin  
 

<br/> 
<br/> 
<br/> 
<br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Mac 系统上搭建ionic需要的环境变量配置 ](http://yuqianglianshou.com/2019/04/ionic-environmental-configuration/)  
> <br/>