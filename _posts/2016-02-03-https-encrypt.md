---
title: 如何使用 Let's Encrypt 免费添加 HTTPS
tags: linux
keywords: encrypt, https, linux
---

:cow: 准备工作: 安装 git、python 2.7及以上、安装证书。
<!--more-->

## 克隆库
```shell
git clone https://github.com/certbot/certbot
```

## 进入安装生成数字证书和私钥文件
```shell
cd certbot
./certbot-auto certonly --standalone --email xx@163.com -d xx.com -d www.xx.com
```

## 安装成功以后会显示数字证书和私钥文件路径，类似下面这种的
```shell
/etc/letsencrypt/live/xx.com/fullchain.pem; # 数字证书
/etc/letsencrypt/live/liurongqing.com/privkey.pem; # 私钥文件

```

## 配置 Nginx

vim /etc/nginx/conf.d/www.xx.com.conf

```shell
server {
  listen 443 ssl;
  server_name www.xx.com;
  ssl_certificate /etc/letsencrypt/live/liurongqing.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/liurongqing.com/privkey.pem;

  ssl_session_cache shared:SSL:100m;
  ssl_session_timeout 500m;

  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://127.0.0.1:2368;
  }
}
```

### 强制使用 https

```shell
server {
  listen 80;
  server_name www.xx.com xx.com;
  return 301 https://www.xx.com$request_uri;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://127.0.0.1:2368;
  }
}
```

## 更新证书

更新前需要关闭 nginx 服务

```shell
systemctl stop nginx.service
```

## 手动更新

```shell
./certbot-auto renew
```

## 自动更新

```shell
./certbot-auto renew --quiet
```

## 更新完开启 nginx 服务

```shell
systemctl start nginx.service
```