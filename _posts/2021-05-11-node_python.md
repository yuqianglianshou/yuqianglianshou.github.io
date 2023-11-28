---
layout: post  
title: python 笔记 
date: 2021-05-11  
tags:  笔记
---
### 纵然时光相隔百年，仍感你心尽在咫尺。  

Python（英国发音：/ˈpaɪθən/；美国发音：/ˈpaɪθɑːn/），是一种广泛使用的解释型、高级和通用的编程语言。Python支持多种编程范型，包括函数式、指令式、反射式、结构化和面向对象编程。它拥有动态类型系统和垃圾回收功能，能够自动管理内存使用，并且其本身拥有一个巨大而广泛的标准库。它的语言结构以及面向对象的方法，旨在帮助程序员为小型的和大型的项目编写逻辑清晰的代码。  
Python的设计哲学，强调代码的可读性和简洁的语法，尤其是使用空格缩进来划分代码块。相比于C或Java，Python让开发者能够用更少的代码表达想法。  


交互式：  
命令行输入 python 或 python3，进入交互式，exit（）或 ctrl+d 退出。  
  
IDE: Pycharm，由JetBrains公司出品，具备一般IDE的功能，比如调试、语法高亮、Project管理、代码跳转、智能提示、自动完成、单元测试、版本控制等等。    
下载 [https://www.jetbrains.com/pycharm/download/#section=windows](https://www.jetbrains.com/pycharm/download/#section=windows)
下载时有收费和免费两个两个版本可以选择 Professional(专业版，收费)和Community(社区版，免费)，一般来说，我们使用Community版本就够了，除非你需要用 Python 进行 Django等Web开发时才需要用到专业版。Windows,Mac,Linux 版本都有。  

在mac中，python分为 2.x 版本 和 3.x 版本，如果执行 python命令，默认是 2.x 版本的python，而我们要使用3.x版本则需要使用 python3 命令，很容易忘记加3导致使用了错误的python版本，怎么样可以用 python 的命令执行 python3 的版本呢？设置环境变量，在终端执行如下代码即可：  
```
echo `alias python=python3`>>.bash_profile  

source .bash_profile

```

与java的不同地方：

```
print（"hello"）print（" world"）  想要做到不换行输出，如下写法
print（"hello"，end=''）print（" world"）

整除：11//2 == 5
幂运算： 3**2 == 9  （3的平方）

字符串占位写法：%s %d %f  字符串 整数 浮点数
name = "张三"
age = 12
tem = "我是%s，我今年%s了。" % (name,age)

%7.2f    7位，2位小数  

字符串快速写法，f标记：（不关心变量类型，不关心精度，f是fomart缩写） 
tem = f"我是{name},我今年{age}了。"

range语句:  
range(5)  == [0,1,2,3,4]
range(5,10)  == [5,6,7,8,9]
range(5,10,2) == （其中 2 是步长） [5,7,9]

def 关键字 定义函数。
global 关键字 定义全局变量。

数据容器：list,tuple(元组)，str，set，dict（字典、映射） 

list：存储数据类型不限，可无限嵌套；
    可以从右向左取下标遍历，-1，-2，-3 、、、；
    添加一个元素 list.append("abc")，添加容器 list.extend(["abc","efg"]);
    插入元素 list.insert(下标，元素)；
    删除元素  del list[0];
    删除并取出元素 element = list.pop(0);
    删除元素 list.remove("abc"),删除第一个出现的元素；
    统计出现次数 count = list.count("abc");
    列表长度 lenth = len(list);

元组 tuple：定义后不可修改；
    元组使用小括号（）定义；
    注意定义单个元组 t1 = ("abc",) 加个逗号，否则是str类型的；
    注意元组内部中存在list，可以修改list。

序列包括 list、str、tuple。
序列切片：对list切片，从index1开始，index4结束，步长1
    my_list = [0,1,2,3,4,5,6,7]
    result_list = my_list[1:4:1]
    结果是 [1,2,3]。
    起始index0可以省略，结束index最后可以省略，步长1可以省略。步长可以是负的，比如-1就等于倒取了。
    倒序的简单写法  re = my_list[::-1]

集合：定义空集合 set1 = set()，形式为{元素,元素};
    无序不支持下标、混装、不重复；
    set1.pop() 随机取出一个，默认第一个；
    set1.different(set2) 取差集得到新集合，set1有的而set2没有的；
    set1.different_update(set2) 在set1中，删除set2中存在的元素，set1被修改；
    set1.union(set2) 得到新集合，取并集。

字典 dictionary：定义空字典 dict1 = dict() 或 dict1 = {},形式为 {key: value,key: value},
    数据类型不限，可以嵌套，即value还可以是字典；

my_dict = {"小红": 20,"小明": 30,"小绿": 40,"蓝": {"小蓝": 11,"大蓝": 22}}  

获取value： value1 = my_dict["小红"]
获取value： value2 = my_dict["蓝"]["大蓝"]
新增或更新 ： my_dict["阿芳"] = 60
删除： value3 = my_dict.pop("小红")，删除并得到值。
获取全部key： keys = my_dict.keys()  keys长这样 ({'小红','小明','小绿','蓝'}) 
   遍历keys  for key in keys: 或者 遍历 dict for key in my_dict: 都是拿到的key，根据key去取value = my_dict[key]

容器互相转换：list(容器),tuple(容器),str(容器),set(容器) 字典将丢失value，str不会。
sorted(序列，reverse = false)通用排序，输出为list格式。

函数参数：
不定长参数传入 
def info(*args)  参数 以元组存在 info("abc",3)
def info(**kwargs) 参数 以字典形式存在 info(name = "abc",age = 3)

异常捕获处理：
try:
    可能发生异常的代码
except NameError as e:
    变量未定义异常处理
except:
    异常发生后执行的代码
else:
    可以定义没有异常的执行代码
finally:
    必定执行代码

对象相关：

魔术方法：
__init__:构造方法
__str__:toString() 方法
__lt__:比较器 小于或大于
__le__:比较器 小于等于或大于等于 
__eq__:比较器 相等
 
私有变量或方法 名字前加两个下划线__相当于private

单例写法，类中定义单类对象引用即可。


```




<br/> 
<br/> 
<br/> 
<br/> 
<br/> 