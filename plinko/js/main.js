jQuery(function() {

    window.addEventListener("load", () => {
        document.querySelector("button.play-btn").disabled = false;
        document.querySelector(".tabs").classList.remove('hidden');
    });

    jQuery('.tabs').on('click', '.tab', function() {
        jQuery('.tabs .tab').removeClass('active');
        jQuery(this).addClass('active');
    });

});