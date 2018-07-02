(function () {

    window.onload = function () {
        let progress = document.createElement('div');
        progress.className = 'progress';
        document.body.appendChild(progress);

        let de = document.documentElement;

        let scrollHeight = de.scrollHeight - de.clientHeight;
        let scroll = 0;
        window.onscroll = function () {
            scroll = de.scrollTop || document.body.scrollTop;
            progress.style.width = Math.ceil((scroll / scrollHeight) * 100) + 'vw';
        }

    }

    // service worker 开启
    if ('serviceWorker' in navigator) {
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
})()