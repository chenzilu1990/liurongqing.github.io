---
layout: page
title: 使用 jekyll + github 搭建免费博客指南
---

Github Pages 有 2 种站点，一种是用户或组织的站点，一种是项目的站点。 <br>
用户或组织的站点仓库根据用户/组织的名称命名 username.github.io，代码放在 master 分支中。 <br>
项目的站点可以随便命名如 projectname， 代码放在 gh-pages 分支中，username.github.io/projectname。

## github 上创建项目

1. 登录 [github](https://github.com/) 
2. 创建新库 username.github.io
3. 选中 Initialize this repository with a README
4. Create repository


## 本地准备工作

> 安装 git（macOS自带，没有则安装）

```bash
# 安装 git
brew install git

# 查看版本
git --version # git version 2.5.4 (Apple Git-61)
```

> 安装 ruby（mac自带，没有则安装）

```bash

# 删除macOS自带的 ruby 引用
sudo rm -rf /usr/bin/ruby

# 安装 ruby
brew install ruby

# 更新 ruby
brew upgrade ruby

# 查看 ruby 版本
ruby -v # ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin14]

# 查看 gem 版本
gem -v # 2.7.6

# 查看 gem 源列表
gem sources -l

# 移除 gem 源
gem sources --remove http://ruby.taobao.org

# 添加 gem 源
gem sources -a https://ruby.taobao.org

# 更新 gem
sudo gem update --system
```

> bundle 更新库文件（要经常执行这个命令）

```bash
bundle update
```

> 安装 jekyll

```bash

# 安装 jekyll 
gem install jekyll

# 查看 jekyll 版本
jekyll -v # 3.8.2
```

## 创建本地目录结构（推荐）

本地创建目录引用 `jekyll-theme-fast` 主题 <br>
优点： 容易更新主题

> 创建目录 `username.github.io`，并在该目录下创建以下目录或文件

> 创建 `_config.yml` 配置文件

```yml
title: 我的博客
description: 这个博客很简洁
theme: jekyll-theme-fast
remote_theme: liurongqing/jekyll-theme-fast
```

> 创建 `Gemfile` 文件

```ruby
source 'https://rubygems.org'

gem 'jekyll'
gem 'jekyll-theme-fast'

```

> 创建 `index.html` 文件

```markdown
--- 
layout: default 
title: 这是我的首页
--- 
```

> 创建 _posts 目录并在该目录下创建 `.md` 结尾文件

2018-06-01-jekyll.md

```markdown
---
layout: page
title: 标题
---
```

> 创建 `README.md` 文件

```markdown
项目说明
```

## 克隆主题直接修改(不推荐)

直接克隆主题，然后在 `_posts` 目录中写内容 <br>
缺点：不好更新主题

```bash
git clone https://github.com/liurongqing/jekyll-theme-fast.git
```

## 安装更新 Gemfile 包

```bash
bundle install

bundle update
```

## 预览项目

```bash

# 开启服务实时监听
jekyll serve

# 打开浏览器访问
http://127.0.0.1:4000
```


## 本地项目关联到 github 上
```bash
# 初始化 git
git init

# 添加提交到本地库
git add .
git commit -m 'first post'

# 关联
git remote add origin git@github.com:username/username.github.io.git

git push origin master
```

## 绑定域名
一、进入域名注册商管理后台，添加一条解析记录
1. 记录类型 CNAME
2. 主机记录 个人域名.com
3. 记录值 username.github.io

二、在本项目根目录下创建 `CNAME` 文件

```
个人域名.com
```

