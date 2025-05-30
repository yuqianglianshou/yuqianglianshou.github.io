---
layout: post  
title: 关于Kotlin 调用 Java中范型T 的错误
date: 2021-03-18  
tags:  技术
---
### 明月本无情，安能慰良人。
<br/> 
Java 代码使用 范型T 的方法，在Kotlin代码中使用时，报错 ：  Cast expression adapter to Nothing   
如下图所示：

<br/>
![](/images/posts/android_T/1.webp){:width="80%" height="80%"}  
<br/>

使用java代码写的调用使用范型T的adapter，如下，这是正常的  

        
        AutoFlowLayout flowLayout1 = (AutoFlowLayout) findViewById(R.id.autoflowlayout1);

        ArrayList list = new ArrayList<String>();
        FlowAdapter adapter = new FlowAdapter(list) {
            @Override
            public View getView(int position) {
                View item = LayoutInflater.from(Test2Activity.this).inflate(R.layout.item_flowlayout, null);

                return item;
            }
        };
        flowLayout1.setAdapter(adapter);



复制到Kotlin代码中，androidstudio 自动将java代码转为kotlin代码，转完后的提示错误的代码  

        val list: java.util.ArrayList<*> = java.util.ArrayList<String>()
        val adapter: FlowAdapter<*> = object : FlowAdapter<Any?>(list) {
            override fun getView(position: Int): View {
                return LayoutInflater.from(mActivity)
                    .inflate(R.layout.item_flowlayout, null)
            }
        }
        autoflowlayout1.setAdapter(adapter)

按它的提示 to Nothing，改为这样      

```java
  autoflowlayout1.setAdapter(adapter as Nothing)  
```
运行时会报错.  

问了一个微信名 为 伯言 的 大佬，给出了解决方案，但是我还是没太明白原因，只知道和范型T有关，java和kotlin的处理是不一样的。 

解决后的代码  

```java
val list: java.util.ArrayList<String> = java.util.ArrayList<String>()
val adapter: FlowAdapter<String> = object : FlowAdapter<String>(list) {
    override fun getView(position: Int): View {
        return LayoutInflater.from(mActivity)
            .inflate(R.layout.item_flowlayout, null)
    }
}
(autoflowlayout1 as AutoFlowLayout<String>).setAdapter(adapter)
```
把 * 号 和 Any? 改为你的数据对象类型，我这里直接用的String，使用 autoflowlayout1 时强转一下就可以了。

<br/>
![](/images/posts/android_T/2.webp){:width="80%" height="80%"}  
<br/>




<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 关于Kotlin 调用 Java中范型T 的错误 ](http://yuqianglianshou.com/2021/03/android-关于Kotlin 调用 Java中范型T 的错误/)  
<br/>