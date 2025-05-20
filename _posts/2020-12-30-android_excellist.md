---
layout: post  
title: Android 实现一个类似Excel表格似的效果 2  
date: 2020-12-30  
tags:  技术
---
### 忽有故人心上过，回首山河便是秋。

[本demo地址 https://github.com/yuqianglianshou/ExcelList](https://github.com/yuqianglianshou/ExcelList)  

效果 由于放GIF图比较卡，这里放几张静态图，也是一目了然。


![](/images/posts/android_excellist/1.webp){:width="30%" height="30%"}  
<br/>
![](/images/posts/android_excellist/2.webp){:width="30%" height="30%"} 
<br/>
![](/images/posts/android_excellist/3.webp){:width="30%" height="30%"} 

<br/>
## 一个类Excel表格似的数据展示如何实现？  
横向可滚可以用HorizontalScrollview实现，纵向可滚可用RecycelerView实现，可 横向 纵向 都能滚怎么弄？  
下面我来一步步分析实现。  

1. 组合 HorizontalScrollview 和 RecycelerView，rv的item布局使用 HorizontalScrollview 实现横向滑动 。  
item 布局如下：  

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="40dp"
    android:background="#b2d235"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:padding="5dp">

    <TextView
        android:id="@+id/tv_name"
        style="@style/Cells"
        android:text="姓名" />

    <HorizontalScrollView
        android:id="@+id/headerHorizontalScrollView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="none">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal">

            <TextView
                android:id="@+id/tv_a"
                style="@style/Cells"
                android:text="性别" />

            <TextView
                android:id="@+id/tv_b"
                style="@style/Cells"
                android:text="年龄" />

            <TextView
                android:id="@+id/tv_c"
                style="@style/Cells"
                android:text="出生日期" />

            <TextView
                android:id="@+id/tv_d"
                style="@style/Cells"
                android:text="家庭住址" />

            <TextView
                android:id="@+id/tv_e"
                style="@style/Cells"
                android:text="电话号码" />

            <TextView
                android:id="@+id/tv_f"
                style="@style/Cells"
                android:text="房？" />

            <TextView
                android:id="@+id/tv_g"
                style="@style/Cells"
                android:text="车？" />
        </LinearLayout>
    </HorizontalScrollView>


</LinearLayout>

```
@style/Cells 如下：  

```  
    <style name="Cells">
        <item name="android:layout_width">@dimen/dimen_width_80</item>
        <item name="android:layout_height">match_parent</item>
        <item name="android:gravity">center_vertical</item>
        <item name="android:padding">5dp</item>
        <item name="android:textSize">14sp</item>
    </style>

```

此布局的实现效果，第一个单元格固定，后面7个可以滑动。  
完成rv设置，adapter设置，实现出来的效果是 纵向滑动没问题，横向滑动则为 每个item各自为营，单独的都可以滑动，缺少了Excel表格的 “联动” 效果。

2. 实现 联动 效果。  
思路是 固定一个 item 布局 作为 头布局，rv中每个 item 的 HorizontalScrollView 监听头布局中 HorizontalScrollView 的滚动，跟随一起滚动，且item中的 HorizontalScrollView 不可滚动，这样的话，rv失去左右滚动效果(避免各自为营的问题)，头布局滚动时rv中所有item会一起滚动。  
首先拦截rv中 HorizontalScrollView 的滚动，方法是 在 HorizontalScrollView 外包裹一层拦截事件的 InterceptLinearLayout ，这样就不会响应到 HorizontalScrollView 的滚动;
其次 HorizontalScrollView 可以添加观察者，实现随一而动的效果，关于如何添加观察者，一会请看 adapter 的实现。

HorizontalScrollView 可添加观察者的实现 CanObserverHorizontalScrollView.kt  

```
import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.widget.HorizontalScrollView

/**
 *
 *@author : lq
 *@date   : 2020/12/28
 *@desc   : 可添加观察者的 HorizontalScrollView
 *
 */
private const val TAG = "lq"
class CanObserverHorizontalScrollView : HorizontalScrollView {

    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context?, attrs: AttributeSet?, defStyle: Int) : super(
        context,
        attrs,
        defStyle
    )

    //定义观察者 集合
    var mScrollViewObserver = ScrollViewObserver()

    override fun onScrollChanged(l: Int, t: Int, oldl: Int, oldt: Int) {
        super.onScrollChanged(l, t, oldl, oldt)
        /*
		 * 当自己 滚动条移动后，引发 滚动事件。通知给所有观察者。
		 */
        if (mScrollViewObserver != null) {
            mScrollViewObserver.notifyOnScrollChanged(l, t, oldl, oldt)
        }

    }

    /*
     * 订阅 本控件 的 滚动条变化事件
     * */
    fun addScrollChangedListener(listener: ScrollViewObserver.OnScrollChangedListener) {
        mScrollViewObserver.addScrollChangedListener(listener)
    }

    /*
     * 取消 订阅 本控件 的 滚动条变化事件
     * */
    fun removeScrollChangedListener(listener: ScrollViewObserver.OnScrollChangedListener) {
        mScrollViewObserver.removeScrollChangedListener(listener)
    }


    /**
     *
     *@author : lq
     *@date   : 2020/12/29
     *@desc   : scrollview  的观察者
     *
     */
    class ScrollViewObserver {
        var mList: ArrayList<OnScrollChangedListener> = ArrayList()

        //添加一个监听者
        fun addScrollChangedListener(listener: OnScrollChangedListener) {
//            Log.i(TAG, "addScrollChangedListener: "+listener.hashCode())
            mList.add(listener)
        }

        //移除一个监听者
        fun removeScrollChangedListener(listener: OnScrollChangedListener) {
//            Log.i(TAG, "removeScrollChangedListener: "+listener.hashCode())
            mList.remove(listener)
        }

        //滚动 传递给所有 监听者
        fun notifyOnScrollChanged(l: Int, t: Int, oldl: Int, oldt: Int) {
            if (mList == null || mList.size == 0) {
                return
            }
            var iterator = mList.iterator()
            while (iterator.hasNext()) {
                var listener = iterator.next()
                if (listener != null) {
                    listener.onScrollChanged(l, t, oldl, oldt)
                } else {
                    iterator.remove()
                }
            }

            Log.i("lq", "notifyOnScrollChanged: mList.size == " + mList.size)
        }


        /**
         *
         *@author : lq
         *@date   : 2020/12/29
         *@desc   : 当发生了滚动事件时
         *
         */
        interface OnScrollChangedListener {
            fun onScrollChanged(l: Int, t: Int, oldl: Int, oldt: Int)
        }


    }

}

```



拦截事件的 LinearLayout 实现 InterceptLinearLayout.kt

```
/**
 *
 *@author : lq
 *@date   : 2020/12/28
 *@desc   : 拦截处理事件，事件不向子控件传递
 *  不响应内部的子控件事件
 */
class InterceptLinearLayout : LinearLayout {
    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)

    override fun onInterceptTouchEvent(ev: MotionEvent?): Boolean {
        // true 为拦截
        return true
    }
}
```
新的 rv的item布局 item_rv.xml
 
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="40dp"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:padding="5dp">

    <TextView
        android:id="@+id/tv_name"
        style="@style/Cells"
        android:background="@drawable/list_item_color_bg"
        android:text="Column1" />

<!--    拦截事件传递到子控件-->
    <com.lq.excellist.InterceptLinearLayout
        android:id="@+id/linearLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@drawable/list_item_color_bg">

        <HorizontalScrollView
            android:id="@+id/horizontalScrollView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scrollbars="none">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="horizontal">

                <TextView
                    android:id="@+id/tv_a"
                    style="@style/Cells"
                    android:text="Column2" />

                <TextView
                    android:id="@+id/tv_b"
                    style="@style/Cells"
                    android:text="Column3" />

                <TextView
                    android:id="@+id/tv_c"
                    style="@style/Cells"
                    android:text="Column4" />

                <TextView
                    android:id="@+id/tv_d"
                    style="@style/Cells"
                    android:text="Column5" />

                <TextView
                    android:id="@+id/tv_e"
                    style="@style/Cells"
                    android:text="Column6" />

                <TextView
                    android:id="@+id/tv_f"
                    style="@style/Cells"
                    android:text="Column7" />

                <TextView
                    android:id="@+id/tv_g"
                    style="@style/Cells"
                    android:text="Column8" />
            </LinearLayout>
        </HorizontalScrollView>
    </com.lq.excellist.InterceptLinearLayout>

</LinearLayout>

```

头布局 item_rv_header.xml  

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="40dp"
    android:background="#b2d235"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:padding="5dp">

    <TextView
        android:id="@+id/tv_name"
        style="@style/Cells"
        android:text="姓名" />


<!--    可添加观察者的HorizontalScrollView-->
    <com.lq.excellist.CanObserverHorizontalScrollView
        android:id="@+id/headerHorizontalScrollView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="none">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal">

            <TextView
                android:id="@+id/tv_a"
                style="@style/Cells"
                android:text="性别" />

            <TextView
                android:id="@+id/tv_b"
                style="@style/Cells"
                android:text="年龄" />

            <TextView
                android:id="@+id/tv_c"
                style="@style/Cells"
                android:text="出生日期" />

            <TextView
                android:id="@+id/tv_d"
                style="@style/Cells"
                android:text="家庭住址" />

            <TextView
                android:id="@+id/tv_e"
                style="@style/Cells"
                android:text="电话号码" />

            <TextView
                android:id="@+id/tv_f"
                style="@style/Cells"
                android:text="房？" />

            <TextView
                android:id="@+id/tv_g"
                style="@style/Cells"
                android:text="车？" />
        </LinearLayout>
    </com.lq.excellist.CanObserverHorizontalScrollView>


</LinearLayout>
```

最终的布局文件 activity_main.xml  

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!--  表头-->
    <include layout="@layout/item_rv_header" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rv"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```
到目前为止，我们已经实现了部分效果，可纵向滑动，手指在 头布局 的 HorizontalScrollView 可滑动并可带动 rv 中所有 item 一起滑动，实现了 联动 效果，还有最后一个问题，手指在rv上没有实现左右滑动，这个通过重写rv的 OnTouchListener 事件，将 此 事件 分发给头布局的 HorizontalScrollView ，与 其一起处理事件，

```
        rv.setOnTouchListener { v, event ->
            //当在rv 上touch时，将事件分发给 表头的 scrollview 处理
            headerHorizontalScrollView.onTouchEvent(event)
            //如果删掉下面这行代码，rv的上下滚动效果会失效
            onTouchEvent(event)
        }
```
所以最终的 MainActivity.kt是  

```
package com.lq.excellist

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.item_rv_header.*
import java.util.*


/**
 * 原理：
 * 将rv的touch事件交给表头的scrollview处理并监听表头的scrollview，表头的scrollview滚动（滑动表头的scrollview 或 滑动rv），通知监听者（rv中所有的scrollview）一起滚动。
 *
 * 1，表头 和 内容 作为两个部分 单独处理。
 * 2，将整个 recyclerview 的touch事件交给表头的 scrollview 处理。
 * 3，将recyclerview的每个item中的scrollview添加为头部scrollview的观察者，使之跟随头部scrollview一起滚动。
 *
 * 表头布局 item_rv_header 和 rv 的 item 布局 item_rv 区别，item_rv 布局在 horizontalscrollview 外 包裹了一层拦截事件的LinearLayout,
 * 即InterceptLinearLayout，用于拦截每个item中scrollview的滚动事件。否则会看到item中每个scrollview都可以单独滚动。item_rv_header 中的 horizontalscrollview 使用的是自定义的可以添加观察者的
 * horizontalscrollview，用于通知所有观察者一起滑动。
 *
 *
 */
class MainActivity : AppCompatActivity() {


    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        rv.setOnTouchListener { v, event ->
            //当在rv 上touch时，将事件分发给 表头的 scrollview 处理
            headerHorizontalScrollView.onTouchEvent(event)
            //如果删掉下面这行代码，rv的上下滚动效果会失效
            onTouchEvent(event)
        }

//        设置布局管理器
        rv.layoutManager = LinearLayoutManager(this)

        val myAdapter = MyAdapter(this, R.layout.item_rv, headerHorizontalScrollView)

        rv.adapter = myAdapter

//        设置数据
        myAdapter.setData(getData())


    }

    /**
     * 模拟数据
     */
    private fun getData(): List<DataBean> {
        val list = ArrayList<DataBean>()
        for (i in 0..119) {
            list.add(
                DataBean(
                    "name $i",
                    "A_ $i", "B_ $i", "C_ $i", "D_ $i", "E_ $i", "F_ $i", "G_ $i"
                )
            )
        }
        return list
    }

}
```

MyAdapter.kt 是

```
package com.lq.excellist

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.HorizontalScrollView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_rv.view.*

/**
 *
 *@author : lq
 *@date   : 2020/12/29
 *@desc   :
 *
 */
class MyAdapter(
    private val context: Context,
    private val resource: Int,
    private val headScrollView: CanObserverHorizontalScrollView
) : RecyclerView.Adapter<MyAdapter.MyViewHoder>() {
    //数据集合
    private var mList = ArrayList<DataBean>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHoder {
        return MyViewHoder(LayoutInflater.from(parent.context).inflate(resource, parent, false))
    }

    override fun onBindViewHolder(holder: MyViewHoder, position: Int) {

        val itemView = holder.itemView
        val bean = mList.get(position)

        //赋值
        itemView.tv_name.text = bean.name
        itemView.tv_a.text = bean.data1
        itemView.tv_b.text = bean.data2
        itemView.tv_c.text = bean.data3
        itemView.tv_d.text = bean.data4
        itemView.tv_e.text = bean.data5
        itemView.tv_f.text = bean.data6
        itemView.tv_g.text = bean.data7

        //item 第一个单元格可点击
        itemView.tv_name.setOnClickListener {
            Toast.makeText(context, "守得云开见月明 " + bean.name, Toast.LENGTH_SHORT).show()
        }

        //注意：放开点击事件 会有 左右滑动难以响应的问题
//        itemView.linearLayout.setOnClickListener {
//            Toast.makeText(context,"守得云开见月明 linearLayout",Toast.LENGTH_SHORT).show()
//        }

        //解决 监听 无限增多问题
        if (itemView.tag == null) {
            //将rv item 中的scrollview 添加为 头布局 中 scrollview 的观察者，使每一个item的滚动跟随 头部 的滚动
            val listener = OnScrollChangedListenerImp(itemView.horizontalScrollView)
            headScrollView.addScrollChangedListener(listener)

            itemView.tag = listener
        }


    }

    override fun getItemCount(): Int {
        return mList.size
    }


    fun setData(list: List<DataBean>) {
        mList.clear()
        mList = list as ArrayList<DataBean>
        notifyDataSetChanged()
    }

    class MyViewHoder(itemView: View) : RecyclerView.ViewHolder(itemView)

    /**
     * 滚动监听  的 实现
     */
    internal class OnScrollChangedListenerImp(var mScrollViewArg: HorizontalScrollView) :
        CanObserverHorizontalScrollView.ScrollViewObserver.OnScrollChangedListener {

        override fun onScrollChanged(l: Int, t: Int, oldl: Int, oldt: Int) {
            mScrollViewArg.smoothScrollTo(l, t)
        }
    }

}
```

DataBean.kt 为  

```
package com.lq.excellist

/**
 *
 *@author : lq
 *@date   : 2020/12/29
 *@desc   :
 *
 */
data class DataBean(
    val name:String,
    val data1:String,
    val data2:String,
    val data3:String,
    val data4:String,
    val data5:String,
    val data6:String,
    val data7:String
)
```

到此，思路与代码全部在上面了，现在还遗留有一个问题，就是rv的item点击事件无法实现，目前能做到的是item的第一个单元格可响应点击，其他的控件如果设置点击监听会与滚动监听冲突。所以这个作为浏览数据用可以，流畅度很好，但是要添加item点击事件是有问题的，注意使用场景。以前写过一个 ListView + HorizontalScrollView 的实现是没这个问题的，不过代码老旧很多地方需要重写优化。


<br/>
<br/> 

<br/> 
<br/> 


<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android 实现一个类似Excel表格似的效果 2 ](http://yuqianglianshou.com/2020/12/android_excellist/)  
<br/>