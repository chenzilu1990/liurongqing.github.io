(function () {

    window.onload = function(){
        let progress = document.createElement('div');
        progress.className = 'progress';
        document.body.appendChild(progress);

        let de = document.documentElement;

        alert('scrollheight: '+de.scrollHeight)
        alert('clientHeight: '+de.clientHeight)
        

        let scrollHeight = de.scrollHeight  - de.clientHeight;
        window.onscroll = function(){
            progress.innerHTML = 'scrollTop: '+de.scrollTop;
            document.querySelector('.footer').innerHTML = 'scrollTop: '+de.scrollTop;
            progress.style.width = (de.scrollTop / scrollHeight) * 100 + '%';
        }

    }
})()