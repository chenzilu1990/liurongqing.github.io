---
title: Nginx 开启 gzip 压缩
keywords: nginx gzip, nginx, gzip
tags: nginx
---

:mouse: nginx 下开启 gzip 配置，及相关配置详细说明。
<!--more-->

## 打开 Nginx 配置文件
```shell
# 如果是 CentOS 系统通过 yum 安装的话
vim /etc/nginx/nginx.conf
```

## 修改配置（不存在则添加）
```shell
# 开启 Gzip
gzip on;

# 不压缩临界值，大于1K的才压缩
gzip_min_length 1k;
gzip_buffers 4 16k;
# gzip_http_version 1.0;

# 压缩级别，1-10，数字越大压缩的越好
gzip_comp_level 5;

# 进行压缩的文件类型
gzip_types text/plain application/x-javascript text/css application/xml text/javascript;
gzip_vary off;

# IE6 对 gzip 不怎么友好，不给它 gzip 了
gzip_disable "MSIE [1-6]\.";
```

## 重启 Nginx
```shell
systemctl restart nginx.service
```

## 用 curl 测试 Gzip 是否成功开启
```shell
# 测试页面压缩 
curl -I -H "Accept-Encoding: gzip, deflate" "http://www.xxx.com/"

# 测试 CSS 文件压缩
curl -I -H "Accept-Encoding: gzip, deflate" "http://www.xxx.com/a.css"

# 测试 JS 文件压缩
curl -I -H "Accept-Encoding: gzip, deflate" "http://www.xxx.com/a.js"
```