---
title: 前端小tips
date: 2018-07-10 9:30:00
categories: tips
tags:
  - tips

---

# 记录一些前端的小tips

(其实没软用)

<!--more-->

## 去除input、textarea的边框内阴影

```
input{
  outline:none;
  -webkit-appearance:none;
}
存在border时也会有内阴影
```

## img标签加载图片错误时显示默认图片
```
<img src="/imgfile/153.jpeg" onerror="this.src='/images/noimg.jpg';this.onerror=null;"> 当加载/imgfile/153.jpeg图片错误时,加载/images/noimg.jpg图片,同时将onerror设为null，否则如果noimg图片加载错误，会一直触发onerror
```

## css控制单行文本溢出部分为省略号
```
｛  还需要加宽度上的限制
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
｝
省略号颜色受color的控制
```

## css控制多行文本溢出部分为省略号
```
｛  还需要加宽度上的限制
	display: -webkit-box;           将对象作为弹性伸缩盒子模型显示 
	-webkit-box-orient: vertical;   设置或检索伸缩盒对象的子元素的排列方式
	-webkit-line-clamp: 3;          限制在一个块元素显示的文本的行数(依据需要更改)
	overflow: hidden;
｝
需要控制div高度和文字行高，如果div中有四行文字,这里只会在第三行末尾显示省略号
```

## 设置canvas充满整个屏幕而不出现滚动条

```
canvas{
  display:block;
}
<!-- 或者 -->
canvas{
  vertical-align:top;//默认为baseline
}
<!-- 在js中设置canvas的宽高,尽量不要在css中设置 -->
```

## flex流式布局

```
<!-- 这里以ul为父元素,li为子元素 -->
ul{
  display:flex;
  flex-wrap:wrap;
  box-pack:justify;
  box-align:justify;
  flex-direction:row;
  align-content:center;
}
li{
  width:   ;
  height:  ;
}
```

## 利用媒体查询引入不同的css文件

```
<link rel="stylesheet" media="screen and (min-width:1px) and (max-width:500px)" href="xxxxxxx" />
<link rel="stylesheet" media="screen and (min-width:500px)" href="xxxxx" />
```

## ie6-ie8支持html5新增标签，支持媒体查询

```
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

```




## 构建后台管理系统可能会用到的一些插件

metisMenu侧边栏

chart、morris图表

datatables表格

echarts图表


## async加载脚本

```<script src="example.js"></script>```

使用上面这种方式时，页面会在这个脚本文件被完全下载、解析、执行完后才去渲染之后的HTML，在这之前会一直处于阻塞状态。这就意味着会增加你的页面的加载时间。有时这种行为是我们希望的，而大多数时候则不想要。

```<script async src="example.js"></script>```

使用上面这种方式时，脚本的加载是异步的，不会影响到这之后的页面解析。脚本会在下载完之后立即执行。需要注意的是，如果有多个使用这种方式异步加载的脚本，他们是没有特定的执行顺序的。


## 表格td内部内容过多时，样式被改变

这里将过多的内容改为省略号
table{
  table-layout: fixed;
}
td{
  overflow:hidden;
  text-overflow: ellipsis;
  max-width:你选择的宽度;
  white-space:nowrap;
}


## 用data-url代替url,减少http请求

Data-URI是指使用图片的数据代替通常使用的图片URI,合理使用它减少HTTP请求数。

```
.icon{
  background-image: url('foo.png');
}
.icon{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII%3D');
}

```

## js判断设备是否是移动端
```
navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
```

## safari浏览器body点击事件不能触发
```
ios设备(包括iPhone和ipad）,给window ，html，document，body绑定click事件，点击不会触发
由于ios系统浏览器都用的safari内核，所以ios端safari浏览器全部中枪

解决方案：
改用touch事件（如果是弹出层的话，会有点透问题）
委托到其他父元素都可以
safari对事件的解析非常特殊，如果一个事件曾经被响应过，则会一直冒泡（捕获）到根结点，所以对于已大规模触发的情况，只需要在body元素的所有子元素绑定一个空事件就好了，如： $("body > *").on("click", function(){};)
```

## div和背景图片的自适应

```
假设背景图片宽高比为 宽/高=80%
div{
  width:40%;这里的40%根据div的父容器的宽度来定，根据需要自己调节
  padding-top:32%; div容器不设定高度，高度由padding来撑开,40%*80% = 32%,32%的值也根据父容器的宽度来定
  background : xxxxxxx  设定背景图片
}
缺点是因为高度由padding-top撑开，不能设定高度,div容器内也不能有其他元素占位，需要设置子元素position：absolute
```

## 一些常用的meta标签

```

<!-- 关键字，搜索引擎 SEO -->
<meta http-equiv="keywords" content="关键字1,关键字2,..."> 
<!-- 页面描述 -->
<meta http-equiv="description" content="网页描述"> 
<!-- 如果安装了GCF，则使用GCF来渲染页面，如果没有安装GCF，则使用最高版本的IE内核进行渲染。
X-UA-Compatible：这是个是IE8的专用标记,用来指定IE8浏览器去模拟某个特定版本的IE浏览器的渲染方式(比如人见人烦的IE6)，以此来解决部分兼容问题。 -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
<!-- 自动刷新，并指向新的页面 -->
<meta http-equiv="Refresh" content="2；URL=http://">
<!-- 禁止浏览器缓存 -->
<!-- 是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出
用法： -->
<meta http-equiv="pragram" content="no-cache"> 
<!-- 清除缓存（再访问这个网站要重新下载！） -->
<meta http-equiv="cache-control" content="no-cache, must-revalidate"> 


<!-- 手机端 -->
<meta name="format-detection" content="telephone=no, email=no"/>
<!-- 忽略页面中的数字识别为电话，忽略email识别 edge会识别一定格式的数字为电话号码,导致数字有a链接般的显示效果,在页面中加入这句可禁止-->
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<!-- 设置苹果工具栏颜色 -->
<!-- 不让百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!-- 不缓存 -->
<meta http-equiv="cache-control" content="no-cache" />
<!-- 初始化设备 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
<!-- 网站开启对iphone私有 web app 程序的支持 -->
<meta content="yes" name="apple-mobile-web-app-capable" />
<!-- 改变顶部状态条的颜色 iphone私有的属性-->
<meta content="black" name="apple-mobile-web-app-status-bar-style" />

```

## ie csshack

![iecsshack.PNG](https://i.loli.net/2018/12/03/5c04c072e36e1.png)


## 淘宝移动端左右两栏布局

![taobaoshangpinlianglanbuju.PNG](https://i.loli.net/2019/06/05/5cf73018241b418593.jpg)

```
<div class="container">
  <div class="img"><img src=""></div>
  <div class="info">
    <div class="title">标题</div>
    .........
  </div>
</div>

.container{
  display:-webkit-box;
}
.container .img{
  width:40px;height:40px;
}
.container .img img{
  width:100%;height:100%;
}
.container .info{
  -webkit-box-flex:1;
}
.container .info .title{
  height:25px;
  <!-- 通过.title一个高度，当文字过长时候可以自动换行 -->
}
左边.img设置一个宽高固定的div(可以用媒体查询适配)
右边.info通过-webkit-box-flex:1;占据剩下的宽度(.info必须为display:block)

```


## ios移动端系统软键盘换行变为前往

```
需要把input放在form内
<form action="">
    <input type="text" placeholder="请输入">
</form>
```

## ios输入框直接呼出数字九键的键盘
```
<input type="text" pattern="[0-9]*" placeholder="请输入数字1">
```

## ios输入框直接呼出26键带有标点符号的数字键盘
```
<input type="number" placeholder="请输入数字">
```

## 打印页面去掉页眉和页脚
```
<style media="print">
    @page
    {
        size: auto;
        margin: 7mm auto;
    }
</style>
```
加大打印时候的边距(金大雕说只在谷歌上有效,ie上我记得看过用注册表实现的方法)


## git subtree 把指定的文件夹推送到指定的分支
比如写vuepress文档时，通常文档的位置在项目的docs/.vuepress/dist目录，而且我们的文档部署的地方是Github中的gh-pages分支，所以可以执行下面命令把文档推到gh-pages分支。
```
git subtree push --prefix docs/.vuepress/dist origin gh-pages
```