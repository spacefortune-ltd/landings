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

});