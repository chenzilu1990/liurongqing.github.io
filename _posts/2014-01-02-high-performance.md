---
title: 《高性能网站建设指南》笔记
---

:sunny: 一些基本的优化方案，值得学习，参考。
<!--more-->

## 规则一：减少 HTTP 请求
### 使用图片地图
1. 服务器端图片地图

    向同一个服务器端 url 提交用户点击的 x, y 坐标
2. 客户端图片地图

    使用 HTML 的 MAP 标签

### CSS Sprites
将多张小图合并成一张大图，通过 `background-position` 偏移值来显示图片
```css
.icon {
    width: 30px;
    height: 30px;
    background-image: url(/images/sprites.png);
}

.icon.home {
    background-position: -30px 0;
}
```

### 内联图片
通过使用 data: URL 模式包含图片，无需额外 `http` 请求
```html
<img src="data:image/gif:base 64,..." alt="img" />
```

### 合并脚本和样式表
打包合并 `JavaScript` 和 `CSS` 减少请求数

## 规则二：使用内容发布网络（CDN）
CDN 是一组分布在不同地理位置的 Web 服务器 <br>
CDN 用于发布静态内容，如图片、脚本、样式表等 <br>
根据不同位置的用户，从离用户最近服务器上加载资源，缩短响应时间 <br>


## 规则三：添加 Expires 头
问题： <br>
:cloud: 为什么有时候 `from memory cache`，有时候 `from disk cache` ？ <br>
:sunny: __还没想好__

:cloud:  缓存时为什么有时候 Request Headers 中出现 Provisional headers are shown ？<br>
:sunny: __还没想好__

1. 设置 Expires 头缓存到期时间 HTTP 1.0 及以上可使用 <br>
    _Nginx 以下配置会同时生成 `Expires` 头与 `Cache-Control`：_
    ```bash
    location ~ .*\.(gif|jpg|jpeg|png|bmp)$ {
        expires 30d;
    }

    location ~ .*\.(js|css)$ {
        expires 10d;
    }
    ```
2. 设置 Cache-Control 使用 max-age 指定缓存时间，秒为单位 HTTP 1.1 及以上可使用 <br>
    _Nginx 配置 生成 `Cache-Control`:_
    ```bash
    location ~ .*\.(gif|jpg|jpeg|png|bmp)$ {
        add_header Cache-Control  max-age=3600;
    }
    ```

    Cache-Control 常见取值
    1. no-cache: 数据内容不能被缓存, 每次请求都重新访问服务器, 若有max-age, 则缓存期间不访问服务器.
    2. no-store: 不仅不能缓存, 连暂存也不可以(即: 临时文件夹中不能暂存该资源)
    3. private(默认): 只能在浏览器中缓存, 只有在第一次请求的时候才访问服务器, 若有max-age, 则缓存期间不访问服务器.
    4. public: 可以被任何缓存区缓存, 如: 浏览器、服务器、代理服务器等
    5. max-age: 相对过期时间, 即以秒为单位的缓存时间.
    6. no-cache, private: 打开新窗口时候重新访问服务器, 若设置max-age, 则缓存期间不访问服务器.
    7. private, 正数的max-age: 后退时候不会访问服务器
    8. no-cache, 正数的max-age: 后退时会访问服务器


3. 修订文件名
    修改链接地址，向服务器请求下载最新的内容 <br>
    每次内容修改后重新生成：`main.0410769e.js` 或 `main.js?v=1.0.0`


## 规则四：压缩资源
### gzip 压缩
问题： <br>
:cloud: 为什么不压缩图片、PDF、字体文件？ <br>
:sunny: __它们本身已经被压缩了，再对它们压缩只会浪费 CPU 资源，可能还会增大文件大小__

1. 压缩的成本 - 服务器需花费额外的 CPU 周期完成压缩 
2. 可对大于 1kb 或 2kb 文件进行压缩
3. 可压缩 `html` `javascript` `css` `xml` `json`

[Nginx 开启 gzip 压缩]({% link _posts/2014-01-03-nginx-gzip.md %})

## 规则五：将样式表放在顶部
1. 使用 link 标签将样式表放在文档 head 中
2. 逐步呈现
3. 样式不需要马上呈现页面的，使用`加载后下载`，否则必须都要遵守第 1 个规则

## 规则六：将脚本放在底部
1. :+1: 脚本放底部加载
2. :+1: 不同主机可增加并行数量，但推荐使用 2、3 个主机即可，过多主机反而会增加页面加载时间
3. :-1: 脚本放顶部加载，会阻塞后面内容的呈现
4. :-1: 脚本放顶部加载，会阻塞后面组件的下载

## 规则七：避免 CSS 表达式
避免使用 CSS 表达式
```css
p {
    /* 避免使用 */
    width: expression(setCntr(),document.body.clientWidth < 600 ? "600px" : "auto");
}
```

## 规则八：使用外部 JavaScript 和 CSS
### 内联 VS 外部
1. 没有缓存，内联比外部快一些，否则相反
2. 如果当前页面用户不经常访问则使用内联
3. 加载后下载
    1. 加载内联资源、并异步加载外部资源放进不可见的 iframe 中
    2. 下载完外部资源后设置 cookie
    3. 如果 cookie 存在则加载外部资源，否则加载内联资源并异步下载外部资源

## 规则九：减少 DNS 查找
1. 使用较少的域名 减少 dns 查找
2. 使用 keep-alive 减少 dns 查找

## 规则十：精简 JavaScript
1. 压缩，条件允许进行混淆压缩
2. 内联代码也进行压缩
3. css 也进行压缩

## 规则十一：避免重定向
1. 缺少结尾的斜线

## 规则十二：移除重复脚本
1. 确保脚本只被包含一次

## 规则十三：配置 ETag
1. 条件 GET 请求（缓存过期或重新加载页面，浏览器重用他之前，产生个http请求检查资源是否有效，有效则返回 304）
2. 检查缓存资源是否有效，有二种方式
    1. 比较最新修改日期
    浏览器使用 If-Modified-Since 头将最新修改日期传回服务器比较，匹配则返回 304
    2. 比较实体标签（Entity Tags HTTP 1.1 引入）
    浏览器使用 If-None-Match 头将 ETag 传回服务器，匹配则返回 304
    3. 配置或移除 ETag

## 规则十四：使 Ajax 可缓存
:cloud: GET 请求只想缓存10分钟？ <br>
```javascript
var time = Math.ceil((new Date - 0) / (1000 * 60 * 10));
var url = url + '?t=' + time;
```
1. GET 的请求是默认在客户端缓存的
2. POST 的请求，是不可以在客户端缓存的
