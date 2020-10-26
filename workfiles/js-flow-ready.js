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

/* JS Ready from customization */
$('form').submit(function (evt) {
	evt.preventDefault();
});
$("body").on("click",".btn-back", function() {
	$(".step-1").removeClass("hidden");
	$(".step-2").addClass("hidden");   
});
$("body").on("click",".saveChar", function() {
	if( $("#character_name").val() != "" ){
		endCharacter();  

	    var dedication_ready = false;
	    if(dedication_ready){
	      scrollToElement("#container_preview", 1000);
	    }else{
	      scrollToElement("#container_dedication", 1000);
	    }
	}	
});
window.onbeforeunload = function(e) {
	if( currentCharToCustom != 0 && currentBook().characters != undefined ){
		var currentC = currentBook().characters[0];
		currentC.name = currentC.name[1];
		newChar( currentC );
	}
}; 
/* Saved characters */
$("body").on("click",".useThisChar", function() {
	var id = $(this).attr("data-id");
	var target = $(this).attr("data-target");
	var list = getCharacters();
	loadFromSaved(list[target][id]);
	$(".close").click();
});
$("body").on("click",".deleteChar", function() {
	var id = $(this).attr("data-id");
	var target = $(this).attr("data-target");
	$(this).parent().parent().nextAll().each(function(index){
		var id = $(this).find(".deleteChar").attr("data-id");
		$(this).find(".deleteChar").attr("data-id",id-1);
	});
	$(this).parent().parent().remove();
	delCharacters(id,target);
});

/* JS Ready from dedication */
$('body').on('click','.useIdea',function(e){
	var id = $(this).attr("data-target");
	var text = $("#"+id).text();
	$("#dedicatory").val(text);
});
$('body').on('click','.editChar',function(e){
	var id = $(this).attr("data-target")*1;
	editModel(id);
});

/*Img file upload*/   
$('#upload-photo').on('change', function(e){
	ResizeImage();
});
$('#dedicatory').on('change', function(e){
	// var dedicatoryObj = {"dedication": $('#dedicatory').val() };
	// addTocurrentBook( dedicatoryObj );
	// resetBook();
});

if( imgData != undefined && imgData != ""){
	$('.nextStep').hide();
	$('._nextStep').show();
}

/*Save Storage*/    
$('.nextStep').on('click', function(e){
	e.preventDefault();
	if( checkcurrentBook().rc==0 || imgData != "") {
		$(this).hide(); $('._nextStep').show();
	}
});

$('._nextStep').on('click', function(e){
});

/* JS Ready from preview */
$("body").on("click",".addToCart", function() {
	if( addToCart() != false ){
		window.location.assign("/==(language)==/==(MAT_url_cart)==");
	}

});


$("body").on("click",".edit-step", function() {
  var step = $(this).closest('.steps');
  $(".steps").removeClass("editing");

  $(step).addClass("editing");
  scrollToElement(step, 1000);
});

$("body").on("click",".save-step", function() {
  var step = $(this).closest('.steps');

  if(step.hasClass('step-dedication')){
    var dedicatoryObj = {"dedication": $('#dedicatory').val(), "photo": imgData };
    addTocurrentBook( dedicatoryObj );
  }else if(step.hasClass('step-configuration')){
  }else{ // character
         if ($('input[name="character_name"]').val() == "") {
//show validation error
		return;
	}
        endCharacter();
  }

  $(step).closest('.steps').removeClass("editing");
  $(step).closest('.steps').addClass("saved");

  updateStepData();
  checkStepsForNextAction();
});

$("body").on("click",".hooray.arrow-down-circle", function() {
  checkStepsForNextAction();
});


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
		// resetBook();
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
		// resetBook();
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

//checkStepsForNextAction();

/* Customization box */
$("body").on("click", ".genderBoy", function () {
	$('.genderBoy').each(function(index, item) {
		if (!$(item).prop('checked')) {
			$(item).prop('checked', true);
		}
	});
	selectGender("chico");
	changeLayersGroupVisibility("pelo");
	showSelectedItem("pelo");
});
$("body").on("click", ".genderGirl", function () {
	$('.genderGirl').each(function(index, item) {
		if (!$(item).prop('checked')) {
			$(item).prop('checked', true);
		}
	});
	selectGender("chica");
	changeLayersGroupVisibility("pelo");
	showSelectedItem("pelo");
});

$("body").on("click", ".runProp", function () {
	// addToCurrentChar(gender,name,layer,type,jsonItem)
	//$("body").addClass("wait");
	var type = $(this).attr("data-type");
	let cChar = currentChar();
	var item = {
		"gender": cChar.gender,
		"gender_origin": cChar.gender_origin,
		"name": $('input[name="character_name"]').val(),
		"layer": $(this).attr("data-layer"),
		"type": type,
		"jsonItem": {}
	};
	if (type == "color") {
		item.jsonItem = {
			"target": $(this).attr("data-target"),
			"fill": $(this).attr("data-fill"),
			"stroke": $(this).attr("data-stroke")
		}
	} else {
		item.jsonItem = $(this).attr("data-target");
		if ($(this).attr("data-fill")) {
			var colorItem = Object.assign({}, item);
			colorItem.jsonItem = {
				"target": $(this).attr("data-color-target"),
				"fill": $(this).attr("data-fill"),
				"stroke": $(this).attr("data-stroke")
			}
			colorItem.type = "color";
			selectOption(colorItem);
		}
	}
	selectOption(item);
	if (type == "color") {
		let extension = Modernizr.webp ? "webp" : "png";
		let show = cChar.layers[item.layer].show;
		buildImagesSelector(jsonData, currentCharToCustom, $(this).attr("data-layer"), cChar.gender_origin, show, $(this).attr("data-fill"), $(this).attr("data-stroke"), extension, $(this).attr("data-layer") == "pendientes");
	}
	$("body").removeClass("wait");
});

//--<< end of it
//select options	
$(".left").on("click", function () {
	var container = $(this).siblings(".customization-slides-container").find("ul");
	var size = ($(this).siblings(".customization-slides-container").find("li").css("width").replace("px", "") * 1) + ($(this).siblings(".customization-slides-container").find("li").css("margin-left").replace("px", "") * 2);
	var currentOffset = container.scrollLeft();
	container.finish().animate({ scrollLeft: currentOffset - size }, 200);
});
$(".right").on("click", function () {
	var container = $(this).siblings(".customization-slides-container").find("ul");
	var size = ($(this).siblings(".customization-slides-container").find("li").css("width").replace("px", "") * 1) + ($(this).siblings(".customization-slides-container").find("li").css("margin-left").replace("px", "") * 2);
	var currentOffset = container.scrollLeft();
	container.finish().animate({ scrollLeft: currentOffset + size }, 200);
});

//script to see the front-end of the different steps -- Could be removed later
$('#create_story_customized_form').submit(function (evt) {
	evt.preventDefault();
});

$("body").on("change", ".Character_name", function () {
	var name = $(".Character_name").val();
	saveNameChar(name);
});

$("body").on("click", ".customization-btn", function (e) {
	var target = $(this).attr("data-target");
	changeLayersGroupVisibility(target);
	showSelectedItem(target);
});

$.ajax({
	// la URL para la petición
	url: '++(DOMAIN)++/==(language)==/assets/' + currentB + '.json',
	type: 'GET',
	dataType: 'json',
	success: function (json) {
		jsonData = json;
		Modernizr.on("webp", function (result) {
			currentCharToCustom = 0;
			buildAllElements(currentCharToCustom);
			checkStepsForNextAction();
		});		
	},
	error: function (xhr, status) {
		console.error("Unable to get book JSON");
	}
});

$("body").on("click",".step-character .edit-step", function() {
	var step = $(this).closest('.steps');

	var info = readCharacterInfo(step.attr('data-character-no'));
	if (step.attr('data-character-no') - 1 != currentCharToCustom || !info)  {	
		currentCharToCustom = step.attr('data-character-no') - 1;
		$('.customize-box').detach().appendTo(step.find('.editing'));			
		buildAllElements(currentCharToCustom);
	} else {
		showSelectedItem("pelo");
	}
});

var $appendToSample = $("#mybook_sample");
var $appendToPreview = $("#mybook_preview");
for(var i = 1; i < amount-2; i ++)
{
	$(`<div page-no="${i+1}"><img/></div>`).appendTo($appendToSample);
	$(`<div page-no="${i+1}"><img/></div>`).appendTo($appendToPreview);
}

$(window).resize(function(){
	const pageSize = (Math.min(1000, window.innerWidth-50)/2).toFixed(0);
	$('#mybook_sample, #mybook_preview').booklet({ 
		width: pageSize*2,
		height: pageSize,
		pageNumbers: false,
		pagePadding: 0,
	});
}).trigger("resize")