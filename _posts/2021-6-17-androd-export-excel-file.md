---
layout: post  
title: 实现 android 程序导出数据到 Excel 表格
date: 2021-06-17  
tags:  技术
---
### 我学会了很多东西，勤俭 隐忍 坚持 淡然 息事宁人，却没学会享受生活。
<br/> 

## 数据如何输出到 Excel 表格中？如下。

## 先看下生成的Excel效果：  
<br/>
![](/images/posts/export_excel_file/4.jpeg){:width="40%" height="40%"}  
<br/>

本demo地址 [https://github.com/yuqianglianshou/ExportExcelFile](https://github.com/yuqianglianshou/ExportExcelFile)  
以VSCode方式打开代码 [https://github1s.com/yuqianglianshou/ExportExcelFile](https://github1s.com/yuqianglianshou/ExportExcelFile)

```
jxl && POI
jxl是一个韩国人写的java操作excel的工具，是一个开源的Java Excel API项目，通过Jxl，Java可以很方便的操作微软的Excel文档。除了Jxl之外，  
还有Apache的一个POI项目，也可以操作Excel，两者相比之下：Jxl使用方便，但功能相对POI比较弱,很多时候，一个软件应用程序需要生成  
Microsoft Excel文件格式的报告。有时，一个应用程序甚至希望将Excel文件作为输入数据。例如，一个公司开发的应用程序将财务部门需要所有输出生成自己的Excel。  
Apache POI是一种流行的API，它允许程序员使用Java程序创建，修改和显示MS Office文件。这由Apache软件基金会开发使用Java分布式设计或修改  
Microsoft Office文件的开源库。它包含类和方法对用户输入数据或文件到MS Office文档进行解码。
```
更多关于jxl的相关方法可以参考文档：  
[http://jexcelapi.sourceforge.net/resources/javadocs/current/docs/](http://jexcelapi.sourceforge.net/resources/javadocs/current/docs/)  
poi的相关内容：  
[https://poi.apache.org/](https://poi.apache.org/)



整体代码结构：  
<br/>
![](/images/posts/export_excel_file/6.png){:width="60%" height="60%"}  
<br/>



首先下载并导入 jxl.jar 包  
jxl.jar包的下载地址：[http://jexcelapi.sourceforge.net/](http://jexcelapi.sourceforge.net/)
可以到我的项目工程中直接拷贝。

<br/>
![](/images/posts/export_excel_file/0.png){:width="40%" height="40%"}  
<br/>

布局文件 activity_main.xml：  
<br/>
![](/images/posts/export_excel_file/7.png){:width="50%" height="50%"}  
<br/>
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="导出"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.229" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:padding="20dp"
        android:text="路径显示区"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btn"
        app:layout_constraintVertical_bias="0.136" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
MainActivity.kt：  
<br/>
![](/images/posts/export_excel_file/8.png){:width="50%" height="50%"}  
<br/>

```java
package com.moon.exportexcelfile

import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.io.File
import java.util.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        //显示存储路径
        val textView = findViewById<TextView>(R.id.textView)
        //导出按键
        findViewById<Button>(R.id.btn).setOnClickListener {
            val file = creatFile()
            ExcelUtils.writeDataToExcel(file, getData())
            Toast.makeText(this, "创建成功", Toast.LENGTH_SHORT).show()
            Log.i("lq ", " ok")
            textView.text = "文件目录为  " + file.absolutePath
        }
    }
    /**
     * 创建一个本地存储路径
     * /storage/emulated/0/Android/data/com.moon.exportexcelfile/files/Documents/export.xls
     */
    private fun creatFile(): File {
        val file =
            File(this.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS)?.absolutePath + File.separator + "export.xls")

        Log.i("lq ", " file == " + file.absolutePath)
        return file
    }
    /**
     * 生成 20行8列 数据，第一行为表头
     */
    private fun getData(): ArrayList<ArrayList<String>> {
        val list = ArrayList<ArrayList<String>>()
        for (j in 1..20) {
            val listRow = ArrayList<String>()
            for (i in 1..8) {
                if (j == 1) {
                    //添加表头
                    listRow.add("表头 $i ")
                } else {
                    listRow.add("$j 行-$i 列")
                }
            }
            list.add(listRow)
        }
        Log.i("lq ", " list == $list")
        return list
    }

}
```

工具类 ExcelUtils.kt：  
<br/>
![](/images/posts/export_excel_file/9.png){:width="50%" height="50%"}  
<br/>

```java
package com.moon.exportexcelfile

import android.util.Log
import jxl.Workbook
import jxl.write.Label
import jxl.write.WritableCellFormat
import jxl.write.WritableFont
import java.io.File

/**
 *
 *@author : lq
 *@date   : 2021/6/17
 *@desc   : 在指定全路径的 Excel表中写入数据
 *
 */
object ExcelUtils {
    //表头样式
    private lateinit var tableFormat: WritableCellFormat
    init {
        Log.i("lq ", "ExcelUtils init")
        format()
    }
    /**
     * excel 样式设置
     */
    private fun format() {
        val tableFont1 = WritableFont(WritableFont.ARIAL, 11, WritableFont.BOLD)//11号字，加粗
//        tableFont1.colour = jxl.format.Colour.LIGHT_BLUE // 可设置颜色

        tableFormat = WritableCellFormat(tableFont1)
        tableFormat.alignment = jxl.format.Alignment.CENTRE // 表格数据居中显示
        tableFormat.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.THIN)
        tableFormat.setBackground(jxl.format.Colour.GRAY_25)//表格添加背景颜色
    }

    /**
     * 写入数据到Excel中
     * file  所创建的Excel文件  /storage/emulated/0/Android/data/com.moon.exportexcelfile/files/Documents/export.xls
     * list  数据集合 j 行 i 列
     */
    fun writeDataToExcel(file: File, list: ArrayList<ArrayList<String>>) {

        if (list.isEmpty() || list.size == 0) {
            return
        }
        if (file.exists()) {
            Log.i("lq ", " 文件已经存在，删除重建")
            file.delete()
        }
        file.createNewFile()
        var workbook = Workbook.createWorkbook(file)
        try {
            //一张 execl 表可以创建很多表单（sheet），默认有3个，这里使用第一张表单创建数据
            val sheet = workbook.createSheet("表单1", 0)

            for (j in list.indices) {

                var listRow = list[j]

                for (i in listRow.indices) {
                    if (j == 0) {
                        //为表头添加样式
                        sheet.addCell(Label(i, j, listRow[i], tableFormat))
                    } else {
                        sheet.addCell(Label(i, j, listRow[i]))
                    }

                    //根据数据长度设置合适列宽
                    if (listRow[i].length <= 5) {
                        sheet.setColumnView(i, listRow[i].length + 8)
                    } else {
                        sheet.setColumnView(i, listRow[i].length + 5)
                    }
                }

                //设置行高
                sheet.setRowView(j, 350)

            }
            workbook.write()
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            workbook?.close()
        }
    }

}
```


注意：需要添加文件写入权限:  
```
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

运行截图：  
<br/>
![](/images/posts/export_excel_file/1.jpeg){:width="40%" height="40%"}  
<br/>
点击导出后：  
<br/>
![](/images/posts/export_excel_file/2.jpeg){:width="40%" height="40%"}  
<br/>
后台log：  
<br/>
![](/images/posts/export_excel_file/3.png){:width="80%" height="80%"}  
<br/>
手机文件管理器找到文件：  
<br/>
![](/images/posts/export_excel_file/5.jpeg){:width="40%" height="40%"}  
<br/>
wps 打开 Excel ：  
<br/>
![](/images/posts/export_excel_file/4.jpeg){:width="40%" height="40%"}  
<br/>


## 0618 新增点击导出直接调用程序打开生成的 excel 表格功能，不再需要去文件管理器自己寻找。    

AndroidManifest.xml 中 添加代码  

```
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/provider_paths" />
        </provider>
```

资源文件夹（res）下创建 xml 目录，创建 provider_paths.xml 文件，内容如下  

```
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-path
        name="external_files"
        path="." />
</paths>
```

新增 FileUtils.kt 工具类，代码如下   

```
package com.moon.exportexcelfile

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import android.widget.Toast
import androidx.core.content.FileProvider
import java.io.File
import java.util.*

/**
 *
 *@author : lq
 *@date   : 5/10/21
 *@desc   : 文件打开工具类
 *
 */
class FileUtils {

    private var mContext: Context

    constructor(mContext: Context) {
        this.mContext = mContext
    }

    /**声明各种类型文件的dataType */
    private val DATA_TYPE_ALL = "*/*" //未指定明确的文件类型，不能使用精确类型的工具打开，需要用户选择

    private val DATA_TYPE_APK = "application/vnd.android.package-archive"
    private val DATA_TYPE_VIDEO = "video/*"
    private val DATA_TYPE_AUDIO = "audio/*"
    private val DATA_TYPE_HTML = "text/html"
    private val DATA_TYPE_IMAGE = "image/*"
    private val DATA_TYPE_PPT = "application/vnd.ms-powerpoint"
    private val DATA_TYPE_EXCEL = "application/vnd.ms-excel"
    private val DATA_TYPE_WORD = "application/msword"
    private val DATA_TYPE_CHM = "application/x-chm"
    private val DATA_TYPE_TXT = "text/plain"
    private val DATA_TYPE_PDF = "application/pdf"

    /**
     * 产生除了视频、音频、网页文件外，打开其他类型文件的Intent
     * @param filePath 文件路径
     * @param dataType 文件类型
     * @return
     */
    private fun generateCommonIntent(
        filePath: String,
        dataType: String
    ): Intent? {
        val intent = Intent()
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent.setAction(Intent.ACTION_VIEW)
        val file = File(filePath)
        val uri = getUri(intent, file)
        intent.setDataAndType(uri, dataType)
        return intent
    }


    /**
     * 产生打开视频或音频的Intent
     * @param filePath 文件路径
     * @param dataType 文件类型
     * @return
     */
    private fun generateVideoAudioIntent(
        filePath: String,
        dataType: String
    ): Intent? {
        val intent =
            Intent(Intent.ACTION_VIEW)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        intent.putExtra("oneshot", 0)
        intent.putExtra("configchange", 0)
        val file = File(filePath)
        intent.setDataAndType(getUri(intent, file), dataType)
        return intent
    }

    /**
     * 产生打开网页文件的Intent
     * @param filePath 文件路径
     * @return
     */
    private fun generateHtmlFileIntent(filePath: String): Intent? {
        val uri = Uri.parse(filePath)
            .buildUpon()
            .encodedAuthority("com.android.htmlfileprovider")
            .scheme("content")
            .encodedPath(filePath)
            .build()
        val intent =
            Intent(Intent.ACTION_VIEW)
        intent.setDataAndType(uri, DATA_TYPE_HTML)
        return intent
    }

    /**
     * 获取对应文件的Uri
     * @param intent 相应的Intent
     * @param file 文件对象
     * @return
     */
    private fun getUri(intent: Intent, file: File): Uri? {
        var uri: Uri? = null
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            //判断版本是否在7.0以上
            uri = FileProvider.getUriForFile(
                mContext, mContext.getPackageName().toString() + ".fileprovider",
                file
            )
            //添加这一句表示对目标应用临时授权该Uri所代表的文件
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        } else {
            uri = Uri.fromFile(file)
        }
        return uri
    }

    /**
     * 打开文件
     * @param filePath 文件的全路径，包括到文件名
     */
    fun openFile(filePath: String) {
        Log.i("lq", "打开文件 == $filePath")
        val file = File(filePath)
        if (!file.exists()) {
            //如果文件不存在
            Toast.makeText(mContext, "文件打开失败，文件已经被移动或者删除", Toast.LENGTH_SHORT).show()
            return
        }
        /* 取得扩展名 */
        val end =
            file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
                .toLowerCase(Locale.getDefault())
        /* 依扩展名的类型决定MimeType */
        var intent: Intent? = null
        if (end == "m4a" || end == "mp3" || end == "mid" || end == "xmf" || end == "ogg" || end == "wav") {
            intent = generateVideoAudioIntent(filePath, DATA_TYPE_AUDIO)
        } else if (end == "3gp" || end == "mp4") {
            intent = generateVideoAudioIntent(filePath, DATA_TYPE_VIDEO)
        } else if (end == "jpg" || end == "gif" || end == "png" || end == "jpeg" || end == "bmp") {
            intent = generateCommonIntent(filePath, DATA_TYPE_IMAGE)
        } else if (end == "apk") {
            intent = generateCommonIntent(filePath, DATA_TYPE_APK)
        } else if (end == "html" || end == "htm") {
            intent = generateHtmlFileIntent(filePath)
        } else if (end == "ppt") {
            intent = generateCommonIntent(filePath, DATA_TYPE_PPT)
        } else if (end == "xls" || end == "xlsx") {
            intent = generateCommonIntent(filePath, DATA_TYPE_EXCEL)
        } else if (end == "doc" || end == "docx") {
            intent = generateCommonIntent(filePath, DATA_TYPE_WORD)
        } else if (end == "pdf") {
            intent = generateCommonIntent(filePath, DATA_TYPE_PDF)
        } else if (end == "chm") {
            intent = generateCommonIntent(filePath, DATA_TYPE_CHM)
        } else if (end == "txt") {
            intent = generateCommonIntent(filePath, DATA_TYPE_TXT)
        } else {
            intent = generateCommonIntent(filePath, DATA_TYPE_ALL)
        }
        try {
            mContext.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
            Toast.makeText(mContext, "未找到可以打开文件的软件", Toast.LENGTH_SHORT).show()
        }

    }
}
```

在导出后调用即可  

```
     FileUtils(this).openFile(file.absolutePath)
```

新的代码结构图：   

<br/>
![](/images/posts/export_excel_file/10.png){:width="80%" height="80%"}  
<br/>

问题：  
混淆打包需要在 proguard-rules.pro 混淆文件中添加   
```
#表格导出相关
-keep class jxl.** {*;}
-keep class common.** {*;}

```

<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
<br/> 
转载请注明：[劉清揚的博客](http://yuqianglianshou.com) » [ 实现 android 程序导出数据到 Excel 表格 ](http://yuqianglianshou.com/2021/06/androd-export-excel-file/)  
<br/>