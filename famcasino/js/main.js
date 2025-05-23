jQuery(function() {

    jQuery('.f-question').click(function () {
        const faqItem = jQuery(this).parent('.faq-item');
        faqItem.toggleClass("open");
        faqItem.find(".f-answer").slideToggle();

        faqItem.siblings('.faq-item').removeClass('open').find('.f-answer').slideUp();
    });


	let swiper = new Swiper('.slider', {
		loop: true,
		slidesPerView: 1,
		breakpoints: {
			0: {
				slidesPerView: 1.8,
				spaceBetween: 10,
			},
            400: {
                slidesPerView: 2.2,
                spaceBetween: 10,
            },
            550: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            730: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
			900: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
			1150: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
            1340: {
                slidesPerView: 7,
                spaceBetween: 20,
            },
		},
	});

    let swiper1 = new Swiper('.slider1', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.swiper1-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.swiper1-button-next',
            prevEl: '.swiper1-button-prev',
        },
    });
});