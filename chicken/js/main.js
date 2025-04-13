jQuery(function() {
    jQuery(function() {
        jQuery('.main .container').on('click', '.buttons .go-btn', function() {
            if (jQuery('body').hasClass('win1')) {
                jQuery('body').removeClass('win1').addClass('move2');
                setTimeout(()=>{
                    jQuery('body').removeClass('move2').addClass('win2');
                    jQuery('.game-field .x20').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x20').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win2')) {
                jQuery('body').removeClass('win2').addClass('move3');
                setTimeout(()=>{
                    jQuery('body').removeClass('move3').addClass('win3');
                    jQuery('.game-field .x30').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x30').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win3')) {
                jQuery('body').removeClass('win3').addClass('move4');
                jQuery('.game-field').scrollLeft(300);
                setTimeout(()=>{
                    jQuery('body').removeClass('move4').addClass('win4');
                    jQuery('.game-field .x50').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x50').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win4')) {
                jQuery('body').removeClass('win4').addClass('move5');
                jQuery('.go-btn').prop('disabled', true);
                setTimeout(()=>{
                    jQuery('body').removeClass('move5').removeClass('win4').removeClass('win3').addClass('win5');
                },300)
            } else {
                jQuery('body').addClass('move1');
                setTimeout(()=>{
                    jQuery('body').removeClass('move1').addClass('win1');
                    jQuery('.game-field .x10').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x10').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            }
        });
    });


    /*document.getElementById('currentYear').textContent = "\u00A0" + new Date().getFullYear().toString() + "\u00A0";

    window.addEventListener("load", () => {
        document.querySelectorAll(".win").forEach((w) => w.classList.remove('hidden'));
        document.querySelector(".tabs").classList.remove('hidden');
    });

    jQuery('.cards').on('click', '.card', function() {
        var card = jQuery(this);

        if(card.hasClass('scratched') || card.hasClass('scratching') || card.hasClass('disable')) {
            return
        }
        card.addClass('scratching');
        var video = card.find('.video').get(0);

        if (jQuery('.tab.sound').hasClass('active')) {
            playSound(bufferCache.scratch, 0.4);
        }

        if(click === 0) {
            playSound(bufferCache.scratch, 0.4);
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.2, true);
            }
            jQuery('.tabs .tab').removeClass('active');
            jQuery('.tab.sound').addClass('active');
        }

        ++click;

        if (video) {
            video.play();
            setTimeout(function() {
                if (jQuery('.tab.sound').hasClass('active')) {
                    playSound(bufferCache[`scratch${click}`], 0.4);
                }
                card.removeClass('scratching');
                card.addClass("scratched");
                const cards = [...document.querySelectorAll(".card")];
                if (cards.length > 0 && cards.every((w) => w.classList.contains('scratched'))) {
                    setTimeout(function() {

                        if (jQuery('.tab.sound').hasClass('active')) {
                            playSound(bufferCache.cong, 0.4);
                        }

                        document.querySelector('body').classList.add('show');
                    }, 1000);
                }
            }, 1500);
        }
    });

    jQuery('.tabs').on('click', '.tab', function () {
        jQuery('.tabs .tab').removeClass('active');
        jQuery(this).addClass('active');

        if (jQuery(this).hasClass('sound')) {
            if (!musicSource) {
                musicSource = playSound(bufferCache.music, 0.2, true);
            }
        } else {
            if (musicSource) {
                musicSource.stop();
                musicSource = null;
            }
        }
    });

    jQuery('a').on('click', function(e) {

        e.preventDefault();

        localStorage.setItem("play", "true");

        const checkInterval = setInterval(() => {
            if (localStorage.getItem("play") === "true") {
                clearInterval(checkInterval);
            }
        }, 50);

        if (jQuery('.tab.sound').hasClass('active')) {
            playSound(bufferCache.click, 0.4);
        }
        musicSource.stop();
        musicSource = null;

        window.location.href = 'https://trck.bestonlinecasino.club/click';
    });*/
    

});