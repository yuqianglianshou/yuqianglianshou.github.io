---
layout: post  
title: Android 实现一个类似Excel表格似的效果  
date: 2018-08-21  
tags:  技术
---
### 滑啊滑 

新版请移至 [ Android 实现一个类似Excel表格似的效果 2 ](http://yuqianglianshou.com/2020/12/android_excellist/) 
> 先看下效果，可否是你想的。
> <br/>
> <br/>
> <br/>
![](/images/posts/excel_list/ExcelList.gif)
> <br/>
> 
> 这个效果是16年做项目时用到的，最近找工作，就把它写简历上了，奈何当年网上找的demo，记忆中还是eclipse的，具体咋实现的忘得差不多了，面试的那哥们对这个特别的感兴趣，啊啊啊。。so,请一定要记得，去面试，简历上自己写的东西一定要滚瓜烂熟的，这是血的教训啊。  
> 于是乎，用AS又重新写了一遍，demo地址 [ExcelLinkage](https://github.com/yuqianglianshou/ExcelLinkage)  
> 下面简要说下实现原理： 整体分为两部分，第一行是一个布局，下面是一个listview，listview的item就是第一行的布局（怎么我的表达能力如此之差，应该能看懂），这个item布局如下：  
> <br/>

<br/>  

```java  

<?xml version="1.0" encoding="utf-8"?>  
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/list_item_color_bg"
    android:descendantFocusability="blocksDescendants"
    android:orientation="horizontal"
    android:padding="5dp">

    <TextView
        android:id="@+id/tv_name"
        android:layout_width="80dp"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_marginLeft="5dp"
        android:layout_marginRight="5dp"
        android:text="Column1"
        android:textAppearance="?android:attr/textAppearanceMedium"/>

    <com.lanqi.excellinkage.InterceptLinearLayout
        android:id="@+id/intercept_linearlayout"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_toRightOf="@id/tv_name"
        android:focusable="false">

        <com.lanqi.excellinkage.MyHorizontalScrollView
            android:id="@+id/horizontalScrollView"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:focusable="false"
            android:scrollbars="none">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:focusable="false"
                android:orientation="horizontal">

                <TextView
                    android:id="@+id/tv_a"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column2"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>

                <TextView
                    android:id="@+id/tv_b"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column3"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>

                <TextView
                    android:id="@+id/tv_c"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column4"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>

                <TextView
                    android:id="@+id/tv_d"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column5"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>

                <TextView
                    android:id="@+id/tv_e"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column6"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>

                <TextView
                    android:id="@+id/tv_f"
                    android:layout_width="80dp"
                    android:layout_height="wrap_content"
                    android:layout_marginLeft="5dp"
                    android:layout_marginRight="5dp"
                    android:text="Column7"
                    android:textAppearance="?android:attr/textAppearanceMedium"/>
            </LinearLayout>
        </com.lanqi.excellinkage.MyHorizontalScrollView>
    </com.lanqi.excellinkage.InterceptLinearLayout>

</RelativeLayout>
```
> 两个关键点，第一个 InterceptLinearLayout ，重写了 onInterceptTouchEvent 方法，反回了 true ，拦截了事件。第二个 MyHorizontalScrollView ，重载了 onScrollChanged（滚动条变化）,监听每次的变化通知给(此变化的)观察者。
> 另外，需要处理第一行与listview的TouchListener传递给 MyHorizontalScrollView 去处理，还有需要给所有的 MyHorizontalScrollView 添加观察者，让他们一同作战。编不下去了，请下载demo自行理解吧。  
> <br/>

<br/>
<br/>
<br/>
<br/>


转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [  Android 实现一个类似Excel表格似的效果  ](http://yuqianglianshou.com/2018/08/android-excel-list/)  