jQuery(function() {

	jQuery('.f-question').click(function () {
		jQuery(this).toggleClass("open").next(".f-answer").slideToggle().parent().siblings().find(".f-answer").slideUp().prev().removeClass("open");
	});


	let swiper = new Swiper('.slider', {
		loop: true,
		slidesPerView: 1,
		breakpoints: {
			0: {
				slidesPerView: 2.2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 5,
				spaceBetween: 10,
			},
			1000: {
				slidesPerView: 7,
				spaceBetween: 20,
			},
		},
	});

});