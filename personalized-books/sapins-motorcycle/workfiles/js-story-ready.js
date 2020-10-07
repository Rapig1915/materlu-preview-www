if( isMobile.any() == null ){
	$('.carouselOurBooks').slick({
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1499.98,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 1159.98,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 679.98,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
}
$('footer').find(".flag").parent(".dropdown-item").on('click', function(e){
	e.preventDefault();
	var lastLang = lang;
	lang = $(this).attr("data-in");
	if( lastLang != lang ){
		var dedicatoryObj = { "language":lang };
		var result = addTocurrentBook( dedicatoryObj );
		setcurrentPreview();
	}
	window.location.assign( $(this).attr("href") );
});

/*
$(window).resize(function() {
	resizeFrame();
}).bind('orientationchange', function() {
	resizeFrame();
});
*/
$(window).onbeforeunload = function(e) {
	delOneSession("currentPreview");
};
$("body").on("click",".LBmodal",function(){
	$(".modalPage").removeClass("active");
	$("#modal-page1").addClass("active");
});
$("body").on("click",".nextImg",function(){
	var t = $(".modalPage.active");
	var l = t.nextAll(".modalPage").length;
	if (l > 0){
		t.removeClass("active");
		t.next(".modalPage").addClass("active");
	}else{
		t.removeClass("active");
		$("#modal-page1").addClass("active");
	}
});
$("body").on("click",".lastImg",function(){
	var t = $(".modalPage.active");
	var l = t.prevAll(".modalPage").length;
	if (l > 0){
		t.removeClass("active");
		t.prev(".modalPage").addClass("active");
	}else{
		t.removeClass("active");
		$(".modalPage:last").addClass("active");
	}
});