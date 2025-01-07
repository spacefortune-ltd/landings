jQuery(function() {

	jQuery('.f-question').click(function () {
		jQuery(this).toggleClass("open").next(".f-answer").slideToggle().parent().siblings().find(".f-answer").slideUp().prev().removeClass("open");
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

});