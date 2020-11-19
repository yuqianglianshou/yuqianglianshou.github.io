---
layout: post  
title: Glide加载的图片有浅绿色背景？  
date: 2016-04-02  
tags:  技术
---
### 原因：

简单来说Glide使用bitmap的编码是RGB565，所以有的时候由于过度压缩导致了图片变绿。  
 
### 解决方案：

改变一下Glide的bitmap编码，新建类 GlideConfiguration.java ,实现 GlideModule 接口，Ctrl + i 实现两个需实现的方法，在方法 applyOptions 中加上 builder.setDecodeFormat(DecodeFormat.PREFER_ARGB_8888); ，如下:  

	import android.content.Context;

	import com.bumptech.glide.Glide;
	import com.bumptech.glide.GlideBuilder;
	import com.bumptech.glide.load.DecodeFormat;
	import com.bumptech.glide.module.GlideModule;

	/**
	 * 增加图片清晰度
	 */
	public class GlideConfiguration implements GlideModule{

    	@Override
    	public void applyOptions(Context context, GlideBuilder builder) {

        		builder.setDecodeFormat(DecodeFormat.PREFER_ARGB_8888);
    	}

    	@Override
    	public void registerComponents(Context context, Glide glide) {
	
    	}
	}
    
然后在 AndroidManifext 中 增加：  

	<!-- 解决glide加载图片背景变绿的问题 -->  
	<meta-data
    android:name="*包名路径*.GlideConfiguration"
    android:value="GlideModule"/>

重新运行试试，如果还解决不了的话，哥们，你百度是没用了。不过目前来看，小伙伴们都解决了。  
此文章总结自百度的N篇博客。  

<br/>
<br/>
<br/>
<br/>


转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [  Glide加载的图片有浅绿色背景？   ](http://yuqianglianshou.com/2016/04/glide_bg_green/)  