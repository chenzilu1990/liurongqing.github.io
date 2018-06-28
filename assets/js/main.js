(function () {

    window.onload = function(){
        let progress = document.createElement('div');
        progress.className = 'progress';
        document.body.appendChild(progress);

        let de = document.documentElement;

        let scrollHeight = de.scrollHeight  - de.clientHeight;
        window.onscroll = function(){
            progress.style.width = (de.scrollTop / scrollHeight) * 100 + '%';
        }

    }
})()