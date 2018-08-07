let CACHE_NAME = 'liurongqing-v2018-08-07-10';

// 页面文件
let pageToCache = ["/tag/book/", "/tag/css/", "/tag/git/", "/tag/html/", "/tag/javascript/", "/tag/jekyll/", "/tag/linux/", "/tag/mac/", "/tag/nginx/", "/tag/phaser/", "/tag/react/", "/tag/tool/", "/mathjax-latex", "/high-performance", "/nginx-gzip", "/yahoo-35", "/phaser2-custom", "/linux-crontab", "/css-rect", "/gitignore", "/server-git", "/shortcuts", "/vscode", "/https-encrypt", "/gulp", "/git-use", "/linux-all", "/nvm", "/gogs", "/scss", "/ghost", "/mnmp", "/mac-software", "/jekyll-github", "/react-1", "/react-2", "/react-3", "/react-4", "/react-5", "/react-6", "/react-7", "/react-8", "/react-9", "/phaser-2048-1", "/phaser-2048-2", "/phaser-2048-3", "/phaser-2048-4", "/phaser-2048-5", "/phaser-2048-6", "/service-worker", "/tag/book/", "/tag/css/", "/tag/git/", "/tag/html/", "/tag/javascript/", "/tag/jekyll/", "/tag/linux/", "/tag/mac/", "/tag/nginx/", "/tag/phaser/", "/tag/react/", "/tag/tool/", "/mathjax-latex", "/high-performance", "/nginx-gzip", "/yahoo-35", "/phaser2-custom", "/linux-crontab", "/css-rect", "/gitignore", "/server-git", "/shortcuts", "/vscode", "/https-encrypt", "/gulp", "/git-use", "/linux-all", "/nvm", "/gogs", "/scss", "/ghost", "/mnmp", "/mac-software", "/jekyll-github", "/react-1", "/react-2", "/react-3", "/react-4", "/react-5", "/react-6", "/react-7", "/react-8", "/react-9", "/phaser-2048-1", "/phaser-2048-2", "/phaser-2048-3", "/phaser-2048-4", "/phaser-2048-5", "/phaser-2048-6", "/service-worker"];

let resToCache = [
    '/',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/images/favicon.ico',
    '/assets/images/logo.svg',
];

let cache_list = pageToCache.concat(resToCache);

// 安装
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(cache_list);
        })
    );
});


// 激活
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

// 提取
self.addEventListener('fetch', function (event) {

    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});