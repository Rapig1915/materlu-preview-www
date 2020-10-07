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
	}	
});
$("body").on( "change", "#character_name", function() {
	var name = $("#character_name").val();
	saveNameChar(name);
});
$("body").off("click",".runProp");
$("body").on("click",".runProp", function() {
	// addToCurrentChar(gender,name,layer,type,jsonItem)
	$("body").addClass("wait");
	var type = $(this).attr("data-type");
	var item = {
		"gender":		 currentGenderChar,
		"gender_origin": currentGender,
		"name": 		 $("#character_name").val(),
		"layer":		 $(this).attr("data-layer"),
		"type":			 type,
		"jsonItem": 	 {}
	};
	if( type == "color" ){
		item.jsonItem = {
			"target":	 $(this).attr("data-target"),
			"fill":		 $(this).attr("data-fill"),
			"stroke":	 $(this).attr("data-stroke")
		}
	}else{
		item.jsonItem = $(this).attr("data-target");
	}
	selectOption(item);
});
$("body").on("click",".left", function() {
	//var elements = $(this).siblings(".customization-slides-container").find("li").length;
	//var container = $(this).siblings(".customization-slides-container").find("ul").css("width").replace("px","")*1;
	var size = ($(this).siblings(".customization-slides-container").find("li").css("width").replace("px","")*1)+($(this).siblings(".customization-slides-container").find("li").css("margin-left").replace("px","")*2);
	var position = $(this).siblings(".customization-slides-container").find("ul").css("margin-left").replace("px","")/size;
	var num = size*(position+2);
	if( num > 0 ) num = 0;
	$(this).siblings(".customization-slides-container").find("ul").css("margin-left",num+"px");
});
$("body").on("click",".right", function() {
	var elements = $(this).siblings(".customization-slides-container").find("li").length;
	var container = $(this).siblings(".customization-slides-container").find("ul").css("width").replace("px","")*1;
	var size = ($(this).siblings(".customization-slides-container").find("li").css("width").replace("px","")*1)+($(this).siblings(".customization-slides-container").find("li").css("margin-left").replace("px","")*2);
	var amount = container/size;
	var position = $(this).siblings(".customization-slides-container").find("ul").css("margin-left").replace("px","")/size;
	var limite = (elements-(container/size))*size*-1;
	var num = size*(position-2);
	if( num < limite ) num = limite;
	$(this).siblings(".customization-slides-container").find("ul").css("margin-left",num+"px");
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

$("body").on( "click", ".charsBreadc", function() {
	
	$(".breadcrumb-selected").addClass("d-none");
	$(this).find(".breadcrumb-selected").removeClass("d-none");
	
	var id = $(this).attr("data-id");
	try {
		currentC = currentBook().characters[id];
		currentCharToCustom = id;
		currentCharID = books["b"+currentB].characters[id].id;
		
		currentGender = currentC.gender_origin;
		currentGenderChar = currentC.gender;
		
		currentC.name = currentC.name[1];
		newChar(currentC);
		setLayers();
		drawModel();
		
		$("#character_name").val(currentC.name);
		
		if( currentGender == "chica"){
			setChica();	
		}else{
			setChico();	
		}
		selectCurrentControls();
		drawSaved();
	}catch(e){
		console.log("Not found");
	}
	
});

/* NEW FOR LAYERS */
$("body").on( "click", "#girl", function() {
	setChica();
});
$("body").on( "click", "#boy", function() {
	setChico();
});
$("body").on("click",".customization-btn", function(e) {
	$(".collapse").removeClass("show");
	//$('.collapse').collapse('hide');
	var target = $(this).attr("data-target");
	$(".customization-dot").removeClass("d-none");
	$(".customization-dot-title").addClass("d-none");  
	$(this).find(".customization-dot").addClass("d-none");
	$(this).find(".customization-dot-title").removeClass("d-none");   
});
$('.carouselAccesories').slick({
	dots: false,
	infinite: true,
	autoplay: false,
	fade: true,
	cssEase: 'linear',
	slidesToShow: 1,
	slidesToScroll: 1
});

$('#Accesories').on('shown.bs.collapse', function (e) {
	$(".carouselAccesories").slick('setPosition');
})

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
	var dedicatoryObj = {"dedication": $('#dedicatory').val() };
	addTocurrentBook( dedicatoryObj );
	getNewRequest(0);
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
	e.preventDefault();
	if( checkcurrentBook().rc==0 || imgData != "") {
		window.location.href = "==(MAT_url_preview)==";
	}        
});