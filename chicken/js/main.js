jQuery(function() {
    jQuery(function() {
        jQuery('.main .container').on('click', '.buttons .go-btn', function() {
            if (jQuery('body').hasClass('win1')) {
                jQuery('body').removeClass('win1').addClass('move2');
                if (window.innerWidth <= 1000) {
                    jQuery('.game-field').scrollLeft(200);
                }
                setTimeout(()=>{
                    jQuery('body').removeClass('move2').addClass('win2');
                    jQuery('.game-field .x20').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x20').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win2')) {
                jQuery('body').removeClass('win2').addClass('move3');
                if (window.innerWidth <= 1000) {
                    jQuery('.game-field').scrollLeft(300);
                }
                setTimeout(()=>{
                    jQuery('body').removeClass('move3').addClass('win3');
                    jQuery('.game-field .x30').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x30').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win3')) {
                jQuery('body').removeClass('win3').addClass('move4');
                if (window.innerWidth <= 1000) {
                    jQuery('.game-field').scrollLeft(400);
                }
                if (window.innerWidth > 1000) {
                    jQuery('.game-field').scrollLeft(300);
                }
                setTimeout(()=>{
                    jQuery('body').removeClass('move4').addClass('win4');
                    jQuery('.game-field .x50').addClass('turn');
                    setTimeout(()=>{
                        jQuery('.game-field .x50').attr('src', 'content-img/goldchick.webp');
                    },200)
                },300)
            } else if (jQuery('body').hasClass('win4')) {
                jQuery('body').removeClass('win4').addClass('move5');
                if (window.innerWidth <= 1000) {
                    jQuery('.game-field').scrollLeft(500);
                }
                jQuery('.go-btn').prop('disabled', true);
                setTimeout(()=>{
                    jQuery('body').removeClass('move5').removeClass('win4').removeClass('win3').addClass('win5');
                },300)
                setTimeout(function() {
                    jQuery('body').addClass('show');
                }, 1500);
            } else {
                jQuery('body').addClass('move1');
                if (window.innerWidth <= 1000) {
                    jQuery('.game-field').scrollLeft(100);
                }
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

});