---
layout: page
title: 使用 jekyll + github 搭建免费博客指南
---

### 准备工作

> 安装 git（没有则安装）

```bash
# 安装 git
brew install git

# 查看版本
git --version # git version 2.5.4 (Apple Git-61)
```

> 安装 ruby（没有则安装，已安装则更新）

```bash
# 安装 ruby
brew install ruby

# 更新 ruby
brew upgrade ruby

# 查看版本
ruby -v # ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin14]
```

### github 上创建项目
1. 登录 [github](https://github.com/) 
2. 创建新库 username.github.io
3. 选中 Initialize this repository with a README
4. Create repository


### 克隆项目到本地
```bash
git clone git@github.com:username/username.github.io.git
```

### 创建 jekyll 项目
```bash
# 进入 username.github.io 库中

```

### 发布到 github 上
```bash
git add .
git commit -m 'first post'
git push origin master
```


### 绑定域名
编辑cname文件

