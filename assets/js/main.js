(function () {

    window.onload = function(){
        let progress = document.createElement('div');
        progress.className = 'progress';
        document.body.appendChild(progress);

        let de = document.documentElement;

        alert('scrollheight: '+de.scrollHeight)
        alert('clientHeight: '+de.clientHeight)
        

        let scrollHeight = de.scrollHeight  - de.clientHeight;
        let scroll = 0;
        window.onscroll = function(){
            // scroll = 
            progress.innerHTML = 'scrollTop: '+document.documentElement.scrollTop + 'body: '+document.body.scrollTop;
            progress.style.width = (de.scrollTop / scrollHeight) * 100 + '%';
        }

    }
})()