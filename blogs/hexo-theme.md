---
title: hexo博客主题设置
date: 2018-05-22 16:30:00
categories: blog
tags:
  - hexo
  - blog
  - githubPage

---


# 简单叙述一下hexo博客更换主题的过程(win10)

通过hexo与github搭建好个人博客之后，我们可以通过`你的github用户名.github.io`访问你的个人博客，此时你的博客应该是这样的
![theme.PNG](https://i.loli.net/2018/05/29/5b0ce9314f8b3.png)

默认主题landscape，我觉得并不好看，因此我们需要对博客美化一番。hexo主题繁多，可以去[官网](https://hexo.io/themes/)上挑选自己喜欢的,我选的是next，一款颇有名气的hexo主题，放上[github页面](https://github.com/iissnan/hexo-theme-next)

在你的博客目录文件夹下，打开git命令行，执行语句

    git clone https://github.com/iissnan/hexo-theme-next themes/next

这句命令的意思是将github上hexo-theme-next这个仓库克隆到themes/next这个文件夹中，如果文件夹不存在，将自动新建。命令执行后，博客目录文件夹下的themes文件夹中分别有landscape和next两个子文件夹。

<!--more-->

打开博客目录下的`_config.yml`文件修改其中的

    theme: landscape
修改为

    theme: next
注意，冒号之后有空格

在命令行中执行

    hexo s --debug
执行本地测试
![test.PNG](https://i.loli.net/2018/05/29/5b0cee84459fc.png)

主题更换成功后，博客页面为
![next.PNG](https://i.loli.net/2018/05/29/5b0ceedc4696c.png)

打开博客目录下themes/next下的`_config.yml`,修改其中参数，对主题进行进一步修改，修改教程可以参考[next官网](http://theme-next.iissnan.com/)