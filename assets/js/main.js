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
})()