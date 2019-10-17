---
layout: post  
title: JDK 知识点 
date: 2019-08-03  
tags:  技术
---
### 劝君立足眼前事，荆棘丛中也开花。  

1. 查看 Mac 下已安装的JDK版本以及目录，终端输入
```
/usr/libexec/java_home -V
```
（注：-V ，V是大写字母。）
返回：
```
qingyang-c729:~ liuqiang$ /usr/libexec/java_home -V
Matching Java Virtual Machines (1):
1.8.0_211, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home
```
2. JDK(Java Development Kit) 目录介绍   
    **bin目录：**该目录用于存放一些可执行程序，如Java 编译器 javac.exe(加个Windows 下的 .exe 比较好看)，Java 运行工具 java.exe，打包工具 jar.exe，文档生成工具 javadoc.exe。  
    javac.exe 是Java编译器工具，它可以将编写好的Java文件编译成字节码文件（可执行的Java程序）。HelloWorld.java -> HelloWorld.class.  
    java.exe是Java运行工具，它会启动一个Java虚拟机（JVM）进程，Java虚拟机相当于一个虚拟的操作系统，它专门负责运行由Java编译器生成的字节码文件。    
    **db目录：**小型数据库。从jdk 6.0开始，Java中引入了一个新的成员 JavaDB，这是一个纯Java 实现、开源的数据库管理系统。这个数据库不仅很轻便，而且支持JDBC 4.0所有的规范，在学习JDBC时，不再需要额外的安装一个数据库软件，选择直接使用JavaDB即可。  
    **jre目录：**Java Runtime Environment 的缩写，意为Java程序运行时环境。此目录是Java运行时环境根目录，它包含 Java 虚拟机，运行时的类包、Java 应用启动器以及一个bin目录，但不包含开发环境中的开发工具。  
    **include目录：**由于jdk是通过C和C++实现的，因此在启动时需要引入一些C语言的头文件，该目录就是用于存放这些头文件的。
    **lib目录：**lib是library的缩写，意为Java类库或库文件，是开发工具使用的归档包文件。  
    src.zip文件：是src文件夹的压缩文件，src中防止的是jdk核心类的源代码，通过该文件可以查看 Java基础类的源代码。  

3. JDK版本变化   
参考[《openjdk 文档》](http://openjdk.java.net/projects/jdk/)  
<br/>
**JDK 1.0**  
开发代号为Oak（橡树），于1996年1月23发行。特点有：  
提供了一个解释执行的 Java 虚拟机；  
Applet 能在 Mozilla 浏览器中运行。  
Java 的 Applet 能在 Mozilla 浏览器中运行，被看作是未来的互联网语言。  
<br/>
**JDK 1.1**  
于 1997年2月19日发行，新特性有：  
引入JDBC（Java Database Connectivity）；  
支持内部类；  
引入Java Bean；  
引入RMI（Remote Method Invocation）；  
引入反射（仅用于内省）。  
Java 语言的基本形态基本确定了，比如反射 (reflection), JavaBean, 接口和类的关系等等，一直到今天都保持一致。然而，Java 最初的一些目标，如在浏览器中执行 Applet，以及跨平台的图形界面 Awt 很快遭遇到负面的评价。  
<br/> 
**JDK 1.2**  
开发代号为 Playground（操场），于1998年12月8日发行。新特性有：  
引入集合（Collection）框架；  
对字符串常量做内存映射；  
引入 JIT（Just In Time） 编译器；  
引入对打包的 Java 文件进行数字签名；  
引入控制授权访问系统资源的策略工具；  
引入 JFC（Java Foundation Classes），包括 Swing 1.0、拖放和 Java 2D 类库；  
引入 Java 插件；  
在 JDBC 中引入可滚动结果集、BLOB、CLOB、批量更新和用户自定义类型；  
在 Applet 中添加声音支持。  
Java 第一个里程碑式的版本。JIT（Just in time）编译器技术，使得语言的可迁移性和执行效率达到最优的平衡，同时 Collections 集合类设计优良，在企业应用开发中迅速得到了广泛使用。  
Sun 公司把 Java 技术体系分成三个方向，分别是 J2SE（面向桌面和通用应用开发），J2EE（面向企业级应用开发），J2ME（面向移动终端开发）。这个分类影响非常久远，体现出主流语言设计者的思想：针对于不同的应用领域，在形态，API 集合等进行划分。  
<br/>
**JDK 1.3**  
开发代号为 Kestrel（红隼），于2000年5月08日发行。新特性有：  
引入Java Sound API；  
jar 文件索引；  
对 Java 的各个方面都做了大量优化和增强。  
J2EE 中的 Servlet 规范获得了极大的成功，伴随着互联网的兴起，和浏览器直接通过 HTTP 协议交互的 Servlet，和众多的 MVC 框架，成为 Web1.0 的网红。  
<br/>
**JDK 1.4**   
开发代号为 Merlin（隼），于2004年2月06日发行（首次在JCP下发行）。新特性有:  
XML 处理；  
Java 打印服务；  
引入 Logging API；  
引入 Java Web Start；  
引入 JDBC 3.0 API；  
引入断言；  
引入 Preferences API；  
引入链式异常处理；  
支持 IPv6；  
支持正则表达式；  
引入 Image I/O slot machine API。  
Java 语言真正走向成熟，提供了非常完备的语言特性，如 NIO，正则表达式，XML 处理器等。  
同年微软的.NET 框架发布，两者开始了为期十几年的暗自竞争。从语言特性上来说，.NET 后发先至，一直处于优势。但 Java 依赖良好的开发者生态，绝大多数大型软件公司的使用者众多和不断贡献，以及对 Linux 操作系统良好的支持，渐渐的在服务器端获得优势地位。  
<br/>
**JDK 5**  
开发代号为Tiger（老虎），于2004年9月30日发行。新特性包有:  
引入泛型；  
增强循环，可以使用迭代方式；  
自动装箱与自动拆箱；  
类型安全的枚举；  
可变参数；  
静态引入；  
元数据（注解）；  
引入 Instrumentation。  
Sun 不再采用 J2SE, J2EE 这种命名方式，而使用 Java SE 5, Java EE 5 这样的名称。  
Java 5 是第二个里程碑式的版本。Java 语言语法发生很大的变化，如注解 (Annotation)，装箱 (Autoboxing)，泛型 (Generic)，枚举 (Enum)，foreach 等被加入，提供了 java.util.concurrent 并发包。  
Java 5 对于 Java 语言的推动是巨大的，特别是注解的加入，使得语言定义灵活了很多，程序员可以写出更加符合领域定义的描述性程序。  
<br/>
**JDK 6**  
开发代号为 Mustang（野马），于2006年12月11日发行。新特性有：  
支持脚本语言；  
引入 JDBC 4.0 API；  
引入 Java Compiler API；  
可插拔注解；  
增加对 Native PKI(Public Key Infrastructure)、Java GSS(Generic Security Service)、Kerberos 和 LDAP(Lightweight Directory Access Protocol) 的支持；  
继承 Web Services；  
做了很多优化。  
这个语言语法改进不多，但在虚拟机内部做了大量的改进，成为一个相当成熟稳定的版本，时至今日国内的很多公司依然以 Java6 作为主要 Java 开发版本来使用。  
同年 Sun 公司做出一个伟大的决定，将 Java 开源。OpenJDK 从 Sun JDK 1.7 版本分支出去，成为今天 OpenJDK 的基础。  
<br/>
**JDK 7**  
开发代号是 Dolphin（海豚），于2011年7月28日发行。新特性有：  
switch 语句块中允许以字符串作为分支条件；  
在创建泛型对象时应用类型推断；  
在一个语句块中捕获多种异常；  
支持动态语言；  
支持 try-with-resources；  
引入 Java NIO.2 开发包；  
数值类型可以用2进制字符串表示，并且可以在字符串表示中添加下划线；  
钻石型语法；  
null 值的自动处理。  
这个版本中的主要的特性是 NIO2 和 Fork/Join 并发包，Java 虚拟机的稳定性真正做到的工业级，成为一个计算平台而服务于全世界。  
<br/>
**JDK 8**  
JDK 8 于2014年3月14号发布。从 Java 8 开始开发代号已经弃用了。新特性有:  
Lambda 表达式  
Pipelines 和 Streams  
Date 和 Time API  
Default 方法  
Type 注解  
Nashhorn JavaScript 引擎  
并发计数器  
Parallel 操作  
移除 PermGen Error  
TLS SNI  
第三个有里程碑意义的 Java 版本。其中最引人注目的便是 Lambda 表达式了，从此 Java 语言原生提供了函数式编程能力。  Java 8 更加适应海量云计算的需要。  
<br/>
**JDK 9**  
JDK 9 于2017年9月21日发布。新特性有：  
模块化 —— Jigsaw  
交互式命令行 —— JShell  
默认的垃圾回收器 —— G1  
进程操作改进  
竞争锁的性能优化  
分段代码缓存  
优化字符串占用空间  
这个版本中最引人注目的时候模块化，通过这个工作，可以构建更小的运行时环境，只需要包括Java平台中任务依赖的部分。这可以更好地适应云端的开发。  
<br/>
**JDK 10，11，12，13，14**   
JDK 10 于2018年3月20日发布。新特性有：  
var声明变量  
移除javah  
IO流大家族添加charset参数  
JVM优化  
HTTPClient转正  
密码学方面的改进  
java命令运行java文件  
废弃Nashorn JavaScript引擎  
JDK12放弃了对JDK6及其以前版本的支持。  








<br/> 
<br/> 
<br/> 
<br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [ JDK 知识点  ](http://xiongzhoudadi.com/2019/08/java-knowledge/)  
> <br/>