---
layout: post  
title: AGP 和 Gradle 升级问题
date: 2024-06-03  
permalink: "/2024/06/agp%E5%92%8Cgradle%E5%8D%87%E7%BA%A7%E9%97%AE%E9%A2%98/"
tags:  技术
---

### 突然之间，他想到了生命的意义。
<br/> 
<br/> 


## **有些项目依然使用 AGP（Android Gradle Plugin）4.x版本、 Gradle 6.x版本 和 JDK = 8。google已经不再维护了，本文简单记录如何分阶段升级。**

## **老项目：**  

## **⚠️ 一、严重过时（发布于 2020 年）**


| 项目  |  当前配置  |  问题  |
| :---: | :---: | :---: |
|  AGP  |  4.1.0	  |  已停止维护，不兼容很多现代库，存在安全/构建风险  |
|  Gradle  |  6.5  |  已被 Gradle 官方废弃，不支持现代语法和工具链  |

## **❌ 二、存在的问题和风险**

✅ 1. 不支持最新 SDK
AGP 4.1 仅支持到 compileSdkVersion 30

无法编译 targetSdk 31+ 的应用，也无法上架 Google Play 新版本（Play 要求 targetSdk >= 33）

✅ 2. 无法使用现代特性
不支持 Jetpack Compose、ViewBinding 的部分高级功能

不支持 .aab App Bundle 的优化构建

不支持 Kotlin 新版本（AGP 4.1 最多支持 Kotlin 1.4）

✅ 3. 存在安全漏洞和构建 bug
不再接收 Google 官方修复

存在已知的资源合并 bug、ProGuard 混淆问题等

## **🛠️ 三、升级建议（推荐配置）**

| 项目  |  建议值  |
| :---: | :---: |
|  AGP  |  8.3.0（或至少 7.4.2）  |
|  Gradle  |  8.5  |
|  JDK  |  17（AGP 8.x 必须）  |
|  Android Studio  |  Iguana (2023.2.1) 或 Hedgehog (2023.1.1)  |

## **四、渐进式升级方案：**

| 阶段  |  目标 AGP  |  Gradle  |  JDK  |  说明  |
| :---: | :---: | :---: | :---: | :---: |
|  ✅ 阶段 1（基础升级）  |  7.0.2  |  7.0.2  |  11  |  JDK = 11	最小升级以兼容较新 SDK  |
|  ✅ 阶段 2（兼容现代项目）  |  7.4.2  |  7.5.1  |  11  |  接近现代环境，支持 compose/viewbinding  |
|  ✅ 阶段 3（全面现代化）  |  8.3.0  |  8.5  |  17  |  支持所有现代功能，满足 Play 要求   |



## 🔧 **阶段 1：从 AGP 4.1.0 → 7.0.2（最小升级）**
1. 修改 build.gradle（Project）：
```
groovy
classpath 'com.android.tools.build:gradle:7.0.2'
```
1. 修改 gradle-wrapper.properties：
```
properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.0.2-all.zip
```

1. 使用 JDK 11 构建（推荐先切换到 JDK 11）


## **🔧 阶段 2：升级至 AGP 7.4.2 / Gradle 7.5.1（稳定现代环境）**

1. build.gradle：
```
groovy
classpath 'com.android.tools.build:gradle:7.4.2'
```
1. gradle-wrapper.properties：
```
properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5.1-all.zip
```

✅ 验证功能：  
Jetpack Compose   

ViewBinding/DataBinding  

混淆 + 多渠道打包  


## **🔧 阶段 3：升级至 AGP 8.3.0 / Gradle 8.5（最终目标）**

1. 升级 JDK 到 17，修改 Android Studio 的 JDK 设置
2. 修改 build.gradle：
```
groovy
classpath 'com.android.tools.build:gradle:8.3.0'
```
或使用 Kotlin DSL 的插件方式：
```
kotlin
plugins {
    id("com.android.application") version "8.3.0" apply false
}
```
1. 修改 gradle-wrapper.properties：
```
properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-all.zip
```
1. 修改 app module 中的配置：
```
groovy
android {
    compileSdk 34

    defaultConfig {
        targetSdk 34
    }
}
```

🧹 升级后注意事项

| 项目  |  内容  |
| :---: | :---: |
|  ⚠️ ProGuard → R8  |  旧版本 ProGuard 文件可能需要适配  |
|  🧩 插件升级  |  Kotlin、Hilt、Room 等插件也要跟进  |
|  🚫 不兼容 API  |  某些第三方库可能不支持 AGP 8，需替换或更新  |
|  🧪 测试  |  升级完建议跑一次 ./gradlew clean build + 单元/UI 测试  |



**附表：Android Studio 和 AGP 的最低版本如下所示：**


| API 级别  |  最低 Android Studio 版本  |  最低 AGP 版本  |
| :---: | :---: | :---: |
|  36.0  |  Meerkat  2024.3.1 Patch  |  8.9.1  |
|  35  |  Koala 功能更新  2024.2.1  |  8.6.0  |
|  34  |  Hedgehog  2023.1.1  |  8.1.1  |
|  33  |  Flamingo  2022.2.1  |  7.2  |


**附表：AGP 与 Gradle 的官方版本兼容表**

| AGP 版本 | 支持 Gradle 版本 | 支持 JDK     | Android Studio 推荐版本   |
| ------ | ------------ | ---------- | --------------------- |
| 7.0.x  | 7.0+         | JDK 11     | Arctic Fox (2020.3.1) |
| 7.4.x  | 7.5+         | JDK 11     | Flamingo (2022.2.1)   |
| 8.0.x  | 8.0+         | **JDK 17** | Giraffe (2022.3.1)    |
| 8.2.x  | 8.4+         | JDK 17     | Hedgehog (2023.1.1)   |
| 8.3.x  | 8.5+         | JDK 17     | Iguana (2023.2.1)     |



## **升级中可能会遇到的问题**

```
报错：
Caused by: org.gradle.api.InvalidUserCodeException: Using insecure protocols with repositories, without explicit opt-in, is unsupported.   
Switch Maven repository 'maven(http://maven.aliyun.com/nexus/content/groups/public/)' to redirect to a secure protocol (like HTTPS) or allow insecure protocols.   
See https://docs.gradle.org/7.0.2/dsl/org.gradle.api.artifacts.repositories.UrlArtifactRepository.html#org.gradle.api.artifacts.repositories.  
UrlArtifactRepository:allowInsecureProtocol for more details.   

原因及解决办法：  
这个错误是 Gradle 7 开始强制要求所有 Maven 仓库使用 HTTPS 协议，而项目中配置了一个 http:// 的阿里云 Maven 仓库，因此构建失败。
将 http 改为 https。
maven { url "http://maven.aliyun.com/nexus/content/groups/public/" }  -》  maven { url "https://maven.aliyun.com/nexus/content/groups/public/" }

```

```
报错：
Could not find method androidTestCompile() for arguments [com.android.support.test.espresso:espresso-core:2.2.2,   
build_ehacf0njcbw4sthkqjlfc72f7$_run_closure2$_closure6@33e335ec] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler

原因及解决办法：  
这个错误是由于使用的 androidTestCompile 已在 AGP 7.0 及以上版本被移除，导致构建失败。
androidTestCompile 是旧版 Gradle 的依赖配置方式，已被官方弃用。  

自 AGP 7.0 起，所有如下旧配置方式都不能再用：  

已弃用                       替代
compile                       implementation
testCompile                   testImplementation
androidTestCompile            androidTestImplementation
provided                      compileOnly

将
androidTestCompile 'com.android.support.test.espresso:espresso-core:2.2.2'  -》 androidTestImplementation 'com.android.support.test.espresso:espresso-core:2.2.2'

Gradle 控制台错误中的 Could not find method xxx() 通常都暗示该 DSL 方法已被移除。

```

```
阶段2时报错：
Caused by: org.gradle.workers.internal.DefaultWorkerExecutor$WorkExecutionException:   
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckAarMetadataWorkAction

原因及解决办法：  
这个错误是 Gradle 和 AGP 7.x 引入的新检查机制导致的，名字叫做 AAR Metadata 检查。
它会在构建时校验你引用的所有 .aar（Android Library）是否兼容你当前的 compileSdkVersion。


升级 compileSdkVersion版本，由compileSdkVersion 30 升级到 compileSdkVersion 31。
如果存在 buildToolsVersion: "30.0.1"  ，可以 删除  buildToolsVersion，因为 buildToolsVersion 在新版 AGP（尤其是 7.0+）中已经不再推荐手动指定。 

```

```
报错：
Caused by: java.lang.RuntimeException: Manifest merger failed with multiple errors, see logs

原因及解决办法：  
Manifest 合并冲突，是 Android 编译时常见错误，尤其在升级 compileSdkVersion 或更换依赖库后容易发生。

在你主工程的 AndroidManifest.xml 里：
<application
    android:allowBackup="false"
    tools:replace="android:allowBackup" <!-- ✅ 添加这行 -->
    ... >

在 manifest 标签中添加：
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools">

```

```
报错：
Namespace not specified. Specify a namespace in the module's build file. 
See https://d.android.com/r/tools/upgrade-assistant/set-namespace for information about setting the namespace.

原因及解决办法：  
使用的 Android Gradle Plugin 7.0 或更高版本，它强制要求在模块的 build.gradle 中声明 namespace（代替旧的 applicationId 推断包名方式）。
如果使用的是多模块项目（如 library 模块），每个模块都需要单独设置 namespace。

在模块（如 app）的 build.gradle 文件中：
找到 android {}，在里面加上：
android {
    namespace 'com.yourcompany.yourapp' // ✅ 你的根包名
    compileSdkVersion 33
    ...
}

删除 AndroidManifest.xml 中的 package 属性。

namespace 用于代码生成和资源处理；

applicationId 仍然控制最终 APK 的包名（例如多渠道打包）；

两者可以不一样，但通常保持一致最安全。

```