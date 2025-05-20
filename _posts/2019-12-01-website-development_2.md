---
layout: post  
title: 网站开发_打war包 
date: 2019-12-01  
tags:  技术
---
### 没有谁会为你踏雪而来，喜欢的风景要自己去看。 

## demo样例:  
[https://github.com/yuqianglianshou/WebsiteDemo](https://github.com/yuqianglianshou/WebsiteDemo)  
初建的SpringBoot项目部署到外部Tomcat中的需要做的修改：  
[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-traditional-deployment)  
1. 
启动类修改:  
继承 org.springframework.boot.web.servlet.support 包下的 SpringBootServletInitializer并覆盖configure方法，config 方法中return值修改为 builder.sources(启动类.class)，在这里，我的项目名字是 sf ，新建项目后会自动生成 SfApplication 启动类。
![](/images/posts/websitedev/9.webp){:width="60%" height="60%"}    

2. 
修改打包方式：  
pom.xml 文件中，packaging标签下的 jar 修改为 war，如3图。

3. 
dependencies 标签下添加tomcat依赖，排除嵌入式tomcat 
```
<!--        添加依赖 tomcat-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
<!--        排除嵌入式tomcat-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```
![](/images/posts/websitedev/10.webp){:width="60%" height="60%"}  

4. 
注释spring-boot-maven-plugin，使用maven-war-plugin  
```
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                </configuration>
            </plugin>
```
![](/images/posts/websitedev/11.webp){:width="60%" height="60%"}  

修改完成，打开右侧 Maven ，双击package 打包，运行成功后，项目中target包下生成war包。如图：  
![](/images/posts/websitedev/12.webp){:width="60%" height="60%"}  

Maven 不熟悉的可以通过下面地址了解一下  
[https://www.yuque.com/wells/engineering/vcki6k](https://www.yuque.com/wells/engineering/vcki6k)

![](/images/posts/websitedev/13.webp){:width="60%" height="60%"}  

<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 网站开发_打war包  ](http://yuqianglianshou.com/2019/12/website-development_2/)  
<br/>