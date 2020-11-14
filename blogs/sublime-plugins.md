---
title: sublime插件安装及推荐
date: 2018-06-8 9:30:00
categories: sublime
tags:
  - sublime
  - plugins

---


# 简述sublime插件安装过程

Sublime Text 是一个代码编辑器，也是HTML和散文先进的文本编辑器。Sublime Text具有漂亮的用户界面和强大的功能，例如代码缩略图，Python的插件，代码段等。还可自定义键绑定，菜单和工具栏。Sublime Text 的主要功能包括：拼写检查，书签，完整的 Python API ， Goto 功能，即时项目切换，多选择，多窗口等等。Sublime Text 是一个跨平台的编辑器，同时支持Windows、Linux、Mac OS X等操作系统。

我个人很喜欢用sublime，在此简述下sublime插件的安装过程

<!--more-->

## 下载安装sublime

打开[sublime官网](https://www.sublimetext.com/),下载安装程序，此篇文章更新时，sublime版本为3176.
安装完成后，打开界sublime，按 **ctrl + \`** 调出console(ps:如果快捷键有冲突，可以要通过菜单栏上的**vivw-show console**打开console)

在console中输入以下代码

    import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

重启sublime，如果在菜单栏**preferences**选项中，可以看到package control，则package control安装成功。如下图所示

![1528449376(1).jpg](https://i.loli.net/2018/06/08/5b1a496b11e0a.jpg)

package control安装成功后，我们就可以直接在线安装插件了， 按下**ctrl+shift+p**调出命令面板，输入`install package`,直接回车或点击红框中的选项。

![1528449636(1).jpg](https://i.loli.net/2018/06/08/5b1a4a6eeafc1.jpg)

然后，插件安装列表会弹出，搜索选择需要的插件，直接安装便可。

若需要删除插件，按下**ctrl+shift+p**调出命令面板,输入`remove package`,直接回车或点击红框中的选项。

![1528449871(1).jpg](https://i.loli.net/2018/06/08/5b1a4b898e514.jpg)

然后在插件列表中选择要删除的插件。


# sublime插件推荐

#### chineseLocalizations
汉化插件，把界面的英文更改为中文

#### IMESupport
输入法候选框跟随

#### Emmet
前端代码补全，贼方便

#### AutoFileName
在src中提示文件路径并补全

#### CSS3
CSS3代码补全

#### jQuery
jQuery代码补全

#### sublimeCodeintel
代码提示补全

#### SideBarEnhancements
侧边栏功能增强

#### CSS3
CSS3代码补全

#### Browser Refresh
浏览器刷新网页