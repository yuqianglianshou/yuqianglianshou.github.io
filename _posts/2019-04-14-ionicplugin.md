---
layout: post  
title: ionic建一个项目自定义一个插件   
date: 2019-04-14  
tags:  技术
---
### 难道我们的青春就这样结束了吗？难道就这样了么？  
## 本文目的：创建一个带有android端自定义插件的ionic空项目
#### 先来创建一个带有android端的ionic空项目 
 
Demo地址： [https://github.com/yuqianglianshou/IonicPluginDemo](https://github.com/yuqianglianshou/IonicPluginDemo)

> 1，E盘新建一个文件夹，起名为 IonicDemo ，作为工作空间，以后ionic项目demo都可以放到这里。  
> 2，打开Visual Studio Code(以下用简称 VSCode),左上角 文件——》打开文件夹，选择刚刚新建的 E:\IonicDemo。  
> <br/>
![](/images/posts/ionicplugin/ionic_1.jpg)
> <br/>
> 
> 3，控制台终端 执行    

> E:\IonicDemo>ionic start myApp blank   

> 创建一个空白的项目，名称为myApp，期间提示   
> Try Ionic 4? n  
> Integrate your new app with Cordova to target native iOS and Android? y  
> Install the free Ionic Pro SDK and connect your app? n  
> 如果没有报错，几分钟之后我们就得到了一个ionic项目。  

> 这还有几个其他命令，  
   
> ionic start myApp blank（空项目）   
	
> ionic start myApp tabs（带导航条）   
	
> ionic start myApp sidemenu（带侧滑菜单）
> 
> 你最初的样子  
> <br/>
![](/images/posts/ionicplugin/xiangmuxinjianwancheng.jpg)
> <br/>
> 
> 4，添加android平台  
> 先来定义包名，默认的包名是在config.xml中的io.ionic.starter，如图（此图是已经添加了插件和android端后的截图）：  
> 
> <br/>
![](/images/posts/ionicplugin/package.jpg)
> <br/>

> 在生成android平台前修改为自己未来项目的包名，例如  com.gosky，

> 然后进入项目目录  
> 
> E:\IonicDemo>cd myApp

> 添加android平台  
> 
> E:\IonicDemo\myApp>ionic cordova platform add android  

> 成功之后myApp目录下多一个platforms 目录，里面有android相关项目代码。 
>  
> 5，至此，我们已经新建了一个带有android端的ionic空项目，测试一下，浏览器运行执行

> E:\IonicDemo\myApp>ionic serve  

> <br/>
![](/images/posts/ionicplugin/liulanqi.jpg)
> <br/>
> 
> 模拟器或手机运行执行

> E:\IonicDemo\myApp>ionic cordova run android

> <br/>

#### 下面就是添加一个自定义插件了

> 1，创建一个插件，插件名字为 MyPlugin ，plugin_id = com.myapp.myplugin，它对应的是android中的目录结构，版本号设为0.0.1  
> 
> E:\IonicDemo\myApp>plugman create --name MyPlugin --plugin_id com.myapp.myplugin --plugin_version 0.0.1  
> 
> 在项目根目录下，即E:\IonicDemo\myApp\ ，多出一个MyPlugin文件。  
> 
> <br/>
![](/images/posts/ionicplugin/plugin1.jpg)
> <br/>
> 
> 2,进入到自定义的plugin目录中添加android部分。   

> E:\IonicDemo\myApp>cd MyPlugin  

> E:\IonicDemo\myApp\MyPlugin>plugman platform add --platform_name android  

> 然后添加packagejson文件  
> 
> E:\IonicDemo\myApp\MyPlugin>plugman createpackagejson E:\IonicDemo\myApp\MyPlugin
>   
> 然后会提示填写插件信息，包括作者描述信息啥的，一路回车就ok。  

> <br/>
![](/images/posts/ionicplugin/pluginfinish.jpg)
> <br/>
> 至此，一个带有android端的自定义插件完成，此时这个插件和项目还没有任何关系，他只是放在了项目的根目录下，你可以剪切复制到任何地方，包括生成时，你可以进入到任何目录去生成（看好终端路径的对应关系）。  
> 但是，默认的plugin.xml配置的CordovaPlugin实现类是有问题的，这里有问题，如图：

> <br/>
![](/images/posts/ionicplugin/packageerr0.jpg)
> <br/>
> 
> 当然也可以运行 但有时Corodva会报找不到插件的错误,一旦安装了这个插件后，在AndroidStudio上也会有报错提示，如图：  
> <br/>
![](/images/posts/ionicplugin/packageerr.jpg)
> <br/>
> 不过运行是没问题的。但是恶心啊，所以，还是改了吧，将这里的  
> <br/>
![](/images/posts/ionicplugin/packageerr0.jpg)
> <br/>
> /MyPlugin 去掉就好了，插件名字为其他的，以此类推就行。

#### 下面，将这个插件和项目挂钩。  
> 
> 退回到项目根目录
> 
> E:\IonicDemo\myApp\MyPlugin>cd ..

> 添加插件  
> 
> E:\IonicDemo\myApp>cordova plugin add E:\IonicDemo\myApp\MyPlugin  
> 
> 完成后根目录下的plugins文件夹下会有我们自定义的插件，如图：  
> <br/>
![](/images/posts/ionicplugin/pluginionicjiegou.jpg)
> <br/>  
> 在AS中打开  
> <br/>
![](/images/posts/ionicplugin/as_1.jpg)
> <br/>  
#### 下面试着用下
> <br/> 
> 现在ionic端添加下调用代码，先在home.html中加一个button 
```java
  <button ion-button (click)="onClickBtn()">
    调用android原生
  </button>
```
> <br/>
![](/images/posts/ionicplugin/ioniccode1.jpg)
> <br/>

> home.ts中加上声明  
```java
	declare let window: any;
```
> 点击事件  
```java
onClickBtn() {
    if (window.cordova) {
      //一种写法  
      // 调用的方法名和参数对应关系来自于 根目录下\plugins\你的插件\www\插件名字.js 
      // exports.coolMethod = function (arg0, success, error) {
      //   exec(success, error, 'MyPlugin', 'coolMethod', [arg0]);
      // };
      window.cordova.plugins.MyPlugin.coolMethod(
        "你帅气么？",
        function (success_msg) { alert("原生返回成功信息 == " + JSON.stringify(success_msg)); },
        function (error_msg) { alert("原生返回失败信息 == " + JSON.stringify(error_msg)); }
      );
      //又一种写法
      // window.cordova.plugins.MyPlugin.coolMethod("ionic 传递到原生的参数",
      //   (reply_success: any) => {
      //     console.log("reply_success == " + JSON.stringify(reply_success));
      //   },
      //   (reply_error: any) => {
      //     console.log("reply_error == " + JSON.stringify(reply_error));
      //   }
      // );
    } else {
      console.log("非移动设备");
    }
  }
```
> <br/>
![](/images/posts/ionicplugin/ioniccode2.jpg)
> <br/>
> 当然要用AS回答一下问题了 
```java
     if("你帅气么？".equals(message)){
        callbackContext.success("当然啦");
      }else{
         callbackContext.success(message);
     }
```
> <br/>
![](/images/posts/ionicplugin/as_2.jpg)
> <br/>
> 此时，作为一名android开发的我，终于可以在AS中写代码了，那ionic的代码，着实让我头疼，甚是头疼。
<br/> 
> 手机运行截图：  
> <br/>
![](/images/posts/ionicplugin/phone.png)
> <br/> 
> <br/> 
> <br/> 
> <br/> 
> <br/> 
转载请注明：[劉清揚的博客](http://xiongzhoudadi.com) » [ ionic建一个项目自定义一个插件 ](http://xiongzhoudadi.com/2019/04/ionicplugin/)  
> <br/>