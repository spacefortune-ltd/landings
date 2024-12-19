jQuery(function() {

	jQuery('.f-question').click(function () {
		jQuery(this).toggleClass("open").next(".f-answer").slideToggle().parent().siblings().find(".f-answer").slideUp().prev().removeClass("open");
	});

	jQuery(document).ready(function() {
	let currentNumber = parseFloat(jQuery('.jackpot-number .number').text().replace(/,/g, '').replace(/\./g, ''));

	function incrementNumber() {
		currentNumber += Math.floor(Math.random() * 200) + 1;
		let formattedNumber = currentNumber.toString();
		let formattedValue = formattedNumber.slice(0,3) + "," + formattedNumber.slice(3,6) + "." + formattedNumber.slice(6);
		jQuery('.jackpot-number .number').text(formattedValue);
	}

	setInterval(incrementNumber, 5000);
	});


	let swiper = new Swiper('.slider', {
		loop: true,
		slidesPerView: 1,
		navigation: {
			nextEl: '.provider-slides .slider-btn.back',
			prevEl: '.provider-slides .slider-btn.next',
			},
		autoplay:{delay: 3000},
		breakpoints: {
			0: {
				slidesPerView: 2.7,
				spaceBetween: 10,
			},
			350: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			390: {
				slidesPerView: 3.7,
				spaceBetween: 10,
			},
			431: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			470: {
				slidesPerView: 4.5,
				spaceBetween: 10,
			},
			570: {
				slidesPerView: 5,
				spaceBetween: 10,
			},
			670: {
				slidesPerView: 6,
				spaceBetween: 10,
			},
			780: {
				slidesPerView: 7,
				spaceBetween: 10,
			},
			870: {
				slidesPerView: 8,
				spaceBetween: 10,
			},
			1000: {
				slidesPerView: 9,
				spaceBetween: 10,
			},
			1100: {
				slidesPerView: 10,
				spaceBetween: 10,
			},
			1200: {
				slidesPerView: 11,
				spaceBetween: 10,
			},
			1300: {
				slidesPerView: 12,
				spaceBetween: 10,
			},
			1400: {
				slidesPerView: 13,
				spaceBetween: 10,
			},
			1500: {
				slidesPerView: 14,
				spaceBetween: 10,
			},
		},
	});

	let swiper1 = new Swiper('.slider1', {
		loop: true,
		slidesPerView: 1,
		autoplay:{delay: 2000},
		breakpoints: {
			0: {
				slidesPerView: 1.3,
				spaceBetween: 10,
			},
			380: {
				slidesPerView: 1.7,
				spaceBetween: 10,
			},
			620: {
				slidesPerView: 2.5,
				spaceBetween: 10,
			},
			860: {
				slidesPerView: 3.5,
				spaceBetween: 10,
			},
			1120: {
				slidesPerView: 4.5,
				spaceBetween: 10,
			},
			1320: {
				slidesPerView: 5.5,
				spaceBetween: 10,
			},
			1520: {
				slidesPerView: 6.5,
				spaceBetween: 10,
			},
		},
	});

	let swiper2 = new Swiper('.slider2', {
		loop: true,
		slidesPerView: 1,
		autoplay:{delay: 3000},
		navigation: {
			nextEl: '.slot-slides .slider-btn.back',
			prevEl: '.slot-slides .slider-btn.next',
			},
		breakpoints: {
			0: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			431: {
				slidesPerView: 2.5,
				spaceBetween: 10,
			},
			500: {
				slidesPerView: 3.5,
				spaceBetween: 10,
			},
			700: {
				slidesPerView: 5.5,
				spaceBetween: 10,
			},
			1000: {
				slidesPerView: 6.5,
				spaceBetween: 10,
			},
			1280: {
				slidesPerView: 8,
				spaceBetween: 10,
			},
		
		},
	});

});