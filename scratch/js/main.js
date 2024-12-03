jQuery(function() {

    document.getElementById('currentYear').textContent = "\u00A0" + new Date().getFullYear().toString() + "\u00A0";

    window.addEventListener("load", () => {
        document.querySelectorAll(".win").forEach((w) => w.classList.remove('hidden'));
    });

    jQuery('.cards').on('click', '.card', function() {
        console.log('here')
        var card = jQuery(this);
        var video = card.find('.video').get(0);

        if (video) {
            video.play();
            setTimeout(function() {
                card.addClass("scratched");
                const cards = [...document.querySelectorAll(".card")];
                if (cards.length > 0 && cards.every((w) => w.classList.contains('scratched'))) {
                    setTimeout(function() {
                        document.querySelector('body').classList.add('show');
                    }, 1000);
                }
            }, 1500);
        }
    });

    // Detect the device type
    function isIOS() {
        return /iPhone|iPad|iPod/.test(navigator.userAgent);
    }

    function isWebMSupported() {
        var video = document.createElement('video');
        return video.canPlayType('video/webm').replace(/^no$/, '') !== '';
    }

    function setupVideo() {
        const videoElements = document.querySelectorAll('.video');
        const webmSources = document.querySelectorAll('.webmSource');
        const hevcSources = document.querySelectorAll('.hevcSource');
        const movSources = document.querySelectorAll('.movSource');

        videoElements.forEach((videoElement, index) => {
            const webmSource = webmSources[index];
            const hevcSource = hevcSources[index];
            const movSource = movSources[index];

            if (isIOS()) {
                hevcSource.style.display = 'block';
                webmSource.style.display = 'none';
                movSource.style.display = 'none';
            } else if (isWebMSupported()) {
                webmSource.style.display = 'block';
                hevcSource.style.display = 'none';
                movSource.style.display = 'none';
            } else {
                webmSource.style.display = 'none';
                hevcSource.style.display = 'none';
                movSource.style.display = 'block';
            }

            videoElement.load();
        });
    }

    setupVideo();

});