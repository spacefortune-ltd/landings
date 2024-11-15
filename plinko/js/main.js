jQuery(function() {

	jQuery('.f-question').click(function () {
		jQuery(this).toggleClass("open").next(".f-answer").slideToggle().parent().siblings().find(".f-answer").slideUp().prev().removeClass("open");
	});

});