---
title: 简单基本的 service worker 的使用
keywords: service-worker, pwa, 缓存, 离线应用
tags: javascript
---

:racehorse:  利用 service-worker 缓存资源例如像CSS，JavaScript、图片、主页和网络请求等操作。
<!--more-->

## register(注册)

> 检测浏览器是否支持 service worker 功能，支持则开启，并通过指定 js 文件注册 service worker 功能。

```javascript
// 入口文件里写上这些
if (navigator.serviceWorker) {
    window.addeventlistener('onload', function(){
        navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
        });
    })
}
```

## install(安装)

> 添加需要缓存的文件，若一个不存在，则全部不成功

```javascript
const CACHE_NAME = 'cache_version_2018_07_02';
const cache_list = [
        '/',
        '/path/to/js.js',
        '/path/to/style.css',
        '/path/to/home.png',
        '/offline'
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        return caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(cache_list);
            });
    );
});
```


## activate(激活)

> 当激活事件被触发的时候，service-worker.js 文件更新时，一个很好的机会去清除过时的缓存

```javascript
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys
          .filter(function (key) {
            return key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          })
        );
      })
  );
});
```

## fetch(提取)

> 每次浏览器向网站发请求时都会触发该事件

```javascript
self.addEventListener('fetch', function (event) {
  ...
});
```

### 非 GET 请求

> 非 GET 请求必须要到服务器请求才可以

```javascript
if (request.method !== 'GET') {
  event.respondWith(
      fetch(request)
          .catch(function () {

              // 如果都是接口请求的话
              return new Response('{code: 200, msg: "当前网络不佳"}', { headers: { 'Content-Type': 'application/json' }})
              
          })
  );
  return;
}
```

### html 页面处理

> 1. 请求页面请求 <br>
> 2. 成功则加入缓存中，若失败则从缓存中读取 <br>
> 3. 缓存中没有则从缓存中读取首页 <br>

```javascript
if (request.headers.get('Accept').indexOf('text/html') !== -1) {
  event.respondWith(
    fetch(request, { credentials: 'include' })
      .then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME)
          .then(function (cache) {
            cache.put(request, copy);
          });
        return response;
      })
      .catch(function () {
        return caches.match(request)
          .then(function (response) {
            return response || caches.match('/');
          })
      })
  );
  return;
}
```

### 接口请求处理

>【简单的查询接口还好，一些 post 请求不建议使用缓存】

> 1. 请求接口 <br>
> 2. 若成功，则缓存接口，若失败，则读取缓存 <br>
> 3. 缓存读取成功，则返回，否则返回指定格式 <br>

```javascript
if (request.headers.get('Accept').indexOf('application/json') !== -1) {
  event.respondWith(
    fetch(request, { credentials: 'include' })
      .then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME)
          .then(function (cache) {
            cache.put(request, copy);
          });
        return response;
      })
      .catch(function () {
        return caches.match(request)
          .then(function (response) {
            return response || new Response('{code: 200, msg: "网络忙"}', { headers: { 'Content-Type': 'application/json' }});
          })
      })
  );
  return;
}
```

### get请求 且 非 html 文件 且 非请求接口处理

> （主要包括静态资源那块）

> 1. 从缓存中读取 <br>
> 2. 若失败则发起一个请求 <br>
> 3. 如果是图片则返回一个占位符 <br>

```javascript
event.respondWith(
  caches.match(request)
    .then(function (response) {
      return response || fetch(request)
        .catch(function () {
          if (request.headers.get('Accept').indexOf('image') !== -1) {
            return new Response('<svg>...</svg>', { headers: { 'Content-Type': 'image/svg+xml' }});
          }
        })
    })
);
```

## 整体代码结构

```javascript
// 安装
self.addEventListener('install', function (event) {
    ...
}

// 激活
self.addEventListener('activate', function (event) {
    ...
}

// 提取
self.addEventListener('fetch', function (event) {
    var request = event.request;
    
    // 非 GET 请求
    if (request.method !== 'GET') {
        event.respondWith(
        ... 
        );
        return;
    }
    

    // HTML 页面请求
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        event.respondWith(
        ...
        );
        return;
    }


    // get 接口请求
    if (request.headers.get('Accept').indexOf('application/json') !== -1) {
        event.respondWith(
        ...
        );
        return;
    }

    // GET 请求 且 非页面请求时 且 非 get 接口请求（一般请求静态资源）
    event.respondWith(
        ...
    );
}


## 支持 PWA

1. 创建 `manifest.json`，在页面上引入

    ```json
    {
        "name": "Zero's Blog",
        "short_name": "Zero's Blog",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#333",
        "theme_color": "#5eace0",
        "icons":[{
            "src": "/assets/images/logo.png",
            "sizes": "144*144",
            "type": "image/png"
        }]
    }
    ```
    ```html
    <link rel="manifest" href="{{ '/manifest.json'}}">
    ```


2. `safari` 不支持 `manifest.json` 可以在 head 中配置些信息即可

    ```html
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Zero's Blog">
    <link rel="apple-touch-icon" href="{{'/assets/images/logo.png'}}">
    ```

```