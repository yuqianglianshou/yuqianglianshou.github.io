---
layout: post  
title: Android EditText修改hint文字大小
date: 2021-11-21  
tags:  技术
---
### 可是孟婆她断了我的桥。


需求：EditText的字体大小18sp，hint文本字体大小为10sp。 

EditText设置hint文本的size。由于没有相关属性，我们需要使用 SpannableString 去实现。 

Google官方是否考虑出一组hint字体相关的属性呢？比如 hintSize,hintColor 这些。

先看效果图，如下，android:textSize="18sp"，为凸显效果，只把 hint 文本前半部分修改为了 10sp。  

<br/>
图1:输入文本，字体大小18sp。
![](/images/posts/android_hint_size/2.webp){:width="80%" height="80%"}  
<br/>
图2:hint文本，设置前半部分字体大小为10sp。
<br/>
![](/images/posts/android_hint_size/1.webp){:width="80%" height="80%"}  
<br/>
Kotlin 代码如下：  
<br/>
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/et"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="18sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

```java
import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.SpannedString
import android.text.style.AbsoluteSizeSpan
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val editText = findViewById<EditText>(R.id.et)
        customHint(editText, "我是hint文本，10sp。秋风知我意，微凉又深情。")
    }

    /**
     * 设置EditText中Hint字体大小
     * @param editText
     * @param hintString
     */
    fun customHint(et: EditText, hintString: String) {
        //设置字体大小
        val textSize = AbsoluteSizeSpan(10, true)

        val spannableString = SpannableString(hintString)
        spannableString.setSpan(
            textSize,
            0,
            hintString.length / 2,//注意这里，为了效果显示，只设置了文本的一半
            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        et.hint = SpannedString(spannableString)
    }
}
```

<br/>
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ Android EditText修改hint文字大小 ](http://yuqianglianshou.com/2021/11/android-EditText修改hint文字大小/)  
<br/>