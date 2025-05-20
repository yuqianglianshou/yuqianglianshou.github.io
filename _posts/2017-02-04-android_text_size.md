---
layout: post  
title: Android使其App字体大小不跟随系统设置  
date: 2017-02-04  
tags: 技术  
---
### 若一去不回。便一去不回。  
Android手机可以通过系统设置来改变字体大小，如图(vivo x5 proD )  
<br/>
![](/images/posts/android_text_size/1.webp){:height="40%" width="40%"}  
当用户修改了系统的字体大小，而我们app没有处理时，UI就出问题了。特别是把字体设置最大时，会出现显示不全，换行等等。。。  
我们要做的是让自己的app不跟随系统字体设置，可以在activity基类（app中所有的activity都应该有继承于我们自己定义的一个BaseActivity基类）中重写该方法：  

```  
import android.content.res.Configuration;
import android.content.res.Resources;

@Override  
public Resources getResources() {  
    Resources res = super.getResources();    
    Configuration config=new Configuration();    
    config.setToDefaults();    
    res.updateConfiguration(config,res.getDisplayMetrics() );  
    return res;  
}  
```
网友有说有些机型此方法没用，暂时未验证，有了解的请留言。
感谢 [小强1002 ](http://blog.csdn.net/zhuqiang1002/article/details/38756127)
