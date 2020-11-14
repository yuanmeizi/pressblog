---
title: hexo与github搭建个人博客
date: 2018-05-22 16:10:00
categories: blog
tags:
  - hexo
  - blog
  - theme

---


# 简单叙述一下通过hexo+github搭建个人博客的过程(win10)

## 本地部署1

hexo是一个高效的静态站点生成框架，它基于node.js。我们可以通过markdown轻松编写文章。

首先安装node.js,去[node.js官网](http://nodejs.cn/),根据你的操作系统版本下载对应的安装文件，我这里是windows64位，下载msi文件就好。安装过程一直下一步

在命令行工具中输入`node -v`以及`npm -v`查看版本号，若成功显示版本号则安装成功。
![version.PNG](https://i.loli.net/2018/05/29/5b0cbc70679d6.png)

接下来安装git，去[git官网](https://git-scm.com/)根据你的操作系统版本下载git。安装过程同样一直下一步。

在命令行工具中输入`git --version`查看git是否安装成功

![gitversion.PNG](https://i.loli.net/2018/05/29/5b0cbdb908024.png)

<!--more-->

新建blog文件夹作为博客目录，在文件夹中点击右键选择git bash here，此时会打开一个命令行窗口，输入`npm install hexo-cli -g`安装hexo。安装过程可能需要几分钟，请耐心等待。安装完成之后如图所示
![hexo.PNG](https://i.loli.net/2018/05/29/5b0cbf62131de.png)

安装完成后输入`hexo init`完成初始化，初始化过程需要一点时间，hexo会在自动新建所需要的文件夹。
![init.PNG](https://i.loli.net/2018/05/29/5b0cc0df64b0a.png)

继续输入代码
`hexo generate`
`hexo server`
就可以在浏览器地址栏中输入localhost：4000查看博客初步效果了,在命令行窗口按ctrl+c停止server
如果4000端口被占用，可以输入`hexo s -p 5000 `使用其他端口(5000可替换为其他数字)

## github部署

去[github官网](https://github.com/)注册帐号并登录，新建一个仓库。
![github.PNG](https://i.loli.net/2018/05/29/5b0cc52999865.png)

在新建仓库页面，设置仓库名字为`你的用户名.github.io` 比如你的github用户名为123，那么仓库名字就是123.github.io
![repo.PNG](https://i.loli.net/2018/05/29/5b0cc60584c39.png)
点击create repository创建仓库

仓库默认分支为master,用来存放hexo生成的文件，新建一个分支为hexo用来存放本地自己的博客markdown文件

在电脑桌面打开git命令行，输入`ssh-keygen -t rsa -C "你的邮箱"`创建ssh密钥，(双引号中不写邮箱，随便写点别的也是可以的)
创建密钥过程中，会提示你确定密钥文件存放路径和密码，直接回车

找到密钥文件id_rsa.pub，默认路径为C:\Users\用户名\.ssh，打开文件复制其中内容。

回到github页面，点击右上方头像，点击setting，进入设置页面
![setting.PNG](https://i.loli.net/2018/05/29/5b0cca086a6fc.png)
在SSH keys and GPG keys页面,点击new ssh key
![ssh.PNG](https://i.loli.net/2018/05/29/5b0ccaef7fa29.png)

title栏随便填，比如blog，key栏将密钥文件中的内容复制进去
![add.PNG](https://i.loli.net/2018/05/29/5b0ccbc7ec500.png)

##本地部署2

回到电脑桌面，打开git命令行，输入`ssh -T git@github.com`测试连接是否成功

如果反馈如下

    Are you sure you want to continue connecting (yes/no)?

输入yes，直接回车，然后就会看到
![测试ssh.PNG](https://i.loli.net/2018/05/29/5b0cce2f4ffe1.png)
此时ssh设置成功，已经能连接到github

去blog文件夹，安装部署工具，打开git命令行，执行

    npm install hexo-deployer-git --save

打开git命令行，设置用户信息

    git config --global user.name "你的用户名"//可以自己取
    git config --global user.email  "你的邮箱"

用记事本方式打开blog文件夹中的config.xml文件
![config.PNG](https://i.loli.net/2018/05/29/5b0ccfce653a4.png)

在文件中找到deploy，作如下修改(冒号后有空格)
![deploy.PNG](https://i.loli.net/2018/05/29/5b0cd10ebf61c.png)

在git命令行中输入`hexo g && hexo d`

执行后会弹出窗口让你输入github的账号和密码，完成后你的博客就被成功部署到github了。

在浏览器地址栏输入`你的用户名.github.io`就能访问你的博客了。

为了方便，将文件push到hexo分支

    git add .
    git commit -m "你想写的注释"
    git push origin hexo

如果想要新建文章，可以在blog文件夹中打开git命令行窗口，执行

    hexo new "文章标题"

博客目录下blog/source/_posts会生成相应的文章标题.md文件。md文件可以用markdown编辑器编辑，随后在命令行窗口中执行`hexo clean`清空缓存，再用`hexo g && hexo d`部署。如果以后换其他电脑更新博客，先用git将仓库克隆到本地，本地生成ssh密钥，在github网站上添加密钥，用`ssh -T git@github.com`测试连接是否成功。npm安装好工具，用同样的代码部署和推送文件就好