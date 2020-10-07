$("body").on("click",".addToCart", function() {
    if( addToCart() != false ){
		window.location.assign("/==(language)==/==(MAT_url_cart)==");
	}
});

/*
$(".pages").bind("turning", function(event, page, view) {
  checkPages(page);
  checkPages(page+1);
  checkPages(page+2);
});
*/

$(window).resize(function() {
	resizeFrame();
}).bind('orientationchange', function() {
	resizeFrame();
});


$('#dropdown').on('change', function(e){
	var lastLang = lang;
	switch( $(e.target).attr('id') ){
		case 'en': text='English';		src="==(MAT_cdn_books)==uploads/united-states.svg";  lang='en'; break;
		case 'es': text='Español';		src="==(MAT_cdn_books)==uploads/spain.svg";          lang='es'; break;
		case 'fr': text='French';		src="==(MAT_cdn_books)==uploads/france.svg";         lang='fr'; break;
		case 'it': text='Italian';		src="==(MAT_cdn_books)==uploads/italy.svg";          lang='it'; break;
		case 'de': text='German';		src="==(MAT_cdn_books)==uploads/germany.svg";        lang='de'; break;
		case 'pt': text='Portuguese';	src="==(MAT_cdn_books)==uploads/portugal.svg";       lang='pt'; break;
	}
	$("#choose-language").find(".storySettings_language").html('<img src="'+src+'" class="country_icon mr-3" alt="country icon"> '+text);
	if( lastLang != lang ){
		var dedicatoryObj = { "language":lang };
		var result = addTocurrentBook( dedicatoryObj );
		resetBook();
	}
});
$("[name='LetterType']").on('click', function(e){
	var lastType = lettertype;
	lettertype = $("[name='LetterType']:checked").val();
	var letterText = $("[name='LetterType']:checked").parent().text();
	$("#choose-letter-type").find(".storySettings_language").text(letterText);
	if( lettertype == undefined ) lettertype = 'standard';
	var dedicatoryObj = { "font_style": lettertype }
	var result = addTocurrentBook( dedicatoryObj );
	if( lastType != lettertype ){
		resetBook();
	}
});
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