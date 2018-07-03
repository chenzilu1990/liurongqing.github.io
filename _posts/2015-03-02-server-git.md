---
title: Centos 系统上创建 git 服务器端
keywords: git, git 服务器端
tags: git
---

:rabbit: 服务器端安装 git、创建 git 库，git 钩子。
<!--more-->

## 检查并安装 git
```shell
# 查看 git 是否已经安装
git --version

# 卸载 git[如果是通过 yum 安装的]
yum remove git

# 安装 git
yum install git

# 测试 git 是否已经安装成功
git --version
```

## 服务器端创建 git 仓库
```shell
# 创建仓库
cd /git/  
git init --bare pdf.git

# 创建 git 用户
useradd git

# 添加密码或更改密码
passwd git

# 创建完 git 用户以后确定 /home/git 的目录权限是不是 git 的，如果不是的话
chown -R git:git /home/git

# 赋予这个库权限
chown -R git:git pdf.git/ 
```

## 钩子
### post-update 钩子
1、进入 git 库的 hooks 目录中，并重命名 post-update.sample 为 post-update

```shell
cd /git/blogpdf.git/hooks

# copy 一份 post-update 文件
cp post-update-sample post-update

# 查看 post-update，如果不是 git 用户权限，则改成 git
chown git:git post-update

# 如果 post-update 没有执行权限，则添加
chmod +x post-update
```

2、在服务器上创建 git 库

```shell
cd /blog/core/www/static  
git clone /git/blogpdf.git

# 更改权限 
chown git:git blogpdf
```

3、post-update 内容

```shell
# 每次本地提交时，服务器要自动 pull 更新的 git 库路径
pdfPath="/blog/core/www/static/blogpdf"  
cd $pdfPath  
unset GIT_DIR  
git pull origin master  
exit 0
```
