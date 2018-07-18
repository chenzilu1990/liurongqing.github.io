(function () {

    window.onload = function () {
        let activeIndex = -1;
        let progress = document.createElement('div');
        progress.className = 'progress';
        document.body.appendChild(progress);

        addMenu();

        let de = document.documentElement;

        let scrollHeight = de.scrollHeight - de.clientHeight;
        let scroll = 0;


        let oTitles = document.querySelectorAll('h2,h3');
        let oMenuItem = document.querySelectorAll('.menu div');
        let aTitles = [];
        for (let i = 1, len = oTitles.length; i < len; i++) {
            aTitles.push(oTitles[i].offsetTop);
        }

        window.scrollBy(0, 1);

        window.onscroll = function () {
            scroll = de.scrollTop || document.body.scrollTop;
            for (let i = aTitles.length; i >= 0; i--) {
                if (scroll > aTitles[i] - 20) {
                    if (activeIndex !== i) {
                        toItem(oMenuItem[i]);
                        activeIndex = i;
                    }
                    return;
                }
            }


            progress.style.width = Math.ceil((scroll / scrollHeight) * 100) + 'vw';
        }

    }

    // service worker 开启
    if (!isLocalhost() && ('serviceWorker' in navigator)) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    function isLocalhost() {
        let hostname = location.hostname;
        if (hostname.search('127.0.0.1') > -1 || hostname.search('localhost') > -1) {
            return true;
        } else {
            return false;
        }
    }
})();


function addMenu() {
    let oMenu = document.querySelector('.menu');
    let oNavs = document.querySelectorAll('h2,h3');

    let aNavs = [], sNavs = '', aText = '', showText = '', nodeName;

    // i 从 1 开始，去掉第一个标题
    for (let i = 1, len = oNavs.length; i < len; i++) {
        // 保留字母数字下划线、中文、空格，然后再将空格替换成-
        aText = oNavs[i].textContent.replace(/[^ \w\u4e00-\u9fa5]/g, '').replace(/ /g, '-').toLowerCase();
        showText = htmlencode(oNavs[i].innerText);
        nodeName = oNavs[i].nodeName.toLowerCase();

        aNavs.push('<div onClick="toItem(this)" class="' + nodeName + '"><a href="#' + aText + '">' + showText + '</a></div>');
    }

    sNavs = aNavs.join('');
    oMenu.innerHTML = sNavs;

    function htmlencode(s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    }
}


function toItem(target) {
    // 移除所有类
    let oMenuItem = document.querySelectorAll('.menu div');
    for (let i = 0, len = oMenuItem.length; i < len; i++) {
        oMenuItem[i].classList.remove('active');
    }

    // 添加当前类
    target.classList.add('active');
}