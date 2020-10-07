<script>
var thisbook = <<(materbooks.data.==(language)==[?].id)>>
var amount = books["b"+thisbook].page_count - 8;
var version = 'Ant.ChkLater.v13:20';
var blockPages = 6;
var lastRequest = 0;
var defaultDedication = "==(MAT_txt_dedication_helper2)==";

isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

</script>

<script>

/* >> Draw Charac 7 layers with Stored img*/
function create7LayersIMG(){

	var placeholder0 = "==(MAT_txt_dedicatory_place0)==";
	var characLists = currentBook().characters;
	var html = '';

	$.each( characLists, function( charNumber, model ){
	let cCharID = books['b'+thisbook].characters[charNumber].id;

		var thisGender = model.gender_origin;

		let validKeyArr = {};
			validKeyArr = books['b'+thisbook].characters[charNumber].option.modelo[thisGender];

			html += '<div class="d-flex justify-content-center character-wrapper-inner col-6 '+thisGender+'-wrapper">';
			let ii = 1;
			$.each( model.layers, function(index, value){

				let indexExist = validKeyArr[index];
				let img = ""; let dLayer="";
				if(  index == "piel" ){
					var color = "e7bfa5";
					if( typeof(value.color) != "undefined" && typeof(value.color.fill) != "undefined" && value.color.fill != "" ) color = value.color.fill;
					img = "https://admin.materlu.com/books/"+thisbook+"/layer_json/"+cCharID+"/"+thisGender+"/o_"+index+color+".png";
					dLayer=index;

				}else if(  value.show == "None" || value.show == "none"  || value.show == "" || indexExist == undefined){
					img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
					dLayer='none';
				}else{
					var color = "";
					if( typeof(value.color) != "undefined" && typeof(value.color.fill) != "undefined" && value.color.fill != "" ) color = value.color.fill;
					img = "https://admin.materlu.com/books/"+thisbook+"/layer_json/"+cCharID+"/"+thisGender+"/o_"+value.show+color+".png";
					dLayer=index;
				}

			   html += '<div class="position-absolute layer-'+ii+' character-layers" data-layer="'+dLayer+'"><img src="'+img+'" alt="'+thisGender+'" class="h-100"></div>';

			   ii ++;
			});

			img = "https://admin.materlu.com/books/"+thisbook+"/layer_json/"+cCharID+"/"+thisGender+"/background.png";

			html += '<div class="position-absolute layer-0 character-layers" data-layer="none"><img src="'+img+'" alt="'+thisGender+'" class="h-100"></div>';

			//edit box
			html += '<div class="d-none-sm d-lg-flex flex-row align-items-center justify-content-center edit-character"><input class="form-control charName" style="width:33%" type="text" value="'+model.name[1]+'" placeholder="'+placeholder0+'" readonly><a href="#" data-target="'+charNumber+'" class="btn btn-materlu customization-dot d-flex align-items-center justify-content-center mx-3 editChar" title="Editar personaje"><i class="fas fa-pencil-alt"></i></a></div>';
			html += '<div class="d-flex d-lg-none flex-row align-items-center justify-content-center edit-character"><a href="#" data-target="'+charNumber+'" class="btn btn-materlu customization-dot d-flex align-items-center justify-content-center editChar editCharSmall" title="Editar personaje"><span class="charNameSpan mr-3">'+model.name[1]+'</span><i class="fas fa-pencil-alt"></i></a></div>';
			html += '</div>';
	});

	$('.characterList').html(html);

}

function currentPreview(){
	try {
		var currentB = JSON.parse( loadSession("currentPreview") );
		if( Object.keys(currentB).length == 0 ){
			throw "Empty";
		}
		return currentB;
	}catch(e){	
		return {};
	}
}
function setcurrentPreview(preview){
	try {
		saveSession("currentPreview",JSON.stringify(preview),'local',1);
	}catch(e){
		return false;
	}
	return true;
}
function loadPage(pagefrom,pageto,next=0,forced=0){
	if( lastRequest == lastRequest || lastRequest == 0){
		if( pagefrom > amount ) return;
		if( pageto > amount ){
			pageto = amount; 
			next = 0;
		}
		if( currentBook().code != undefined ){
			$.ajax({
				url: "https://admin.materlu.com/api/get-book-pages?",
				type: "GET",
				data: {
					"code": currentBook().code,
					"from": pagefrom,
					"to": pageto,
					"preview": 1
				},
				success: function(res){
					console.log("LOADED: "+pagefrom+"-"+pageto);
					var currentP = currentPreview();
					for(var i=0;i<res.pages.length;i++){
						var ind = pagefrom+i;
						currentP["page"+ind] = res.pages[i];
					}
					setcurrentPreview(currentP);
					if(next>0){
						loadPage(pageto+1, pageto+next+1, next);
					}
					if(forced == 1){
						checkPages(pagefrom);
					}
				},
				error: function(error){
					console.log("GET PAGES FAILED: "+pagefrom+" - "+pageto);
					console.log(error);
				}
			});
		}else{
			console.log("NO REQUEST CODE");
		}
	}else{
		console.log("REQUEST CANCELED");
	}
}
function getNewRequest(start=0){
	var result = "";
	var curB = currentBook();
	for(var i=0;i<curB.characters.length;i++){
		delete curB.characters[i].src;
		if( typeof(curB.characters[i].name) == "string"){
			var nameId = books['b'+thisbook].characters[i].option.name;
			curB.characters[i].name = [ nameId, characters[i].name ];
		}
	}
	if( curB.font_style == undefined) curB.font_style = "standard";
	if( curB.language == undefined) curB.language = lang;
	var thisDedication = curB.dedication;
	if( thisDedication == undefined || thisDedication == "" ){
		thisDedication = defaultDedication;
	}
	curB.dedication = parseDedication(thisDedication);
	if( curB.photo == undefined) curB.photo = "";
	var dataSub = {
        "storyId": curB.storyId,
        "language": curB.language,
        "font_style": curB.font_style,
        "characters": JSON.stringify(curB.characters),
        "dedication": curB.dedication,
        "photo": curB.photo
	};
	if( curB.code != undefined) dataSub.code = curB.code;
	var currentP = currentPreview();
	$.ajax({
		url: "https://admin.materlu.com/api/save-preview-story?",
		type: "POST",
		data: dataSub,
		success: function(res){
			console.log(res)
			lastRequest = { "code": res.code, "dedication": thisDedication }
			var result = addTocurrentBook( lastRequest );
			if( start == 1 ){
				loadPage(1,1,0);
				loadPage(3,3+blockPages,blockPages);
			}
		},
		error: function(error){
			console.log("NEW REQUEST FAILED");
			console.log(error);
		}
	});
}
/*
function loadPage(number,cont=false){
	var result = "";
	var curB = currentBook();
	delete curB.characters[0].src;
	curB.type = "web";
	curB.json = JSON.stringify(curB.characters);
	curB.pageNo = number;
	delete curB.characters;
	if( curB.language == undefined ) curB.language = lang;
	var dataSub = {
			api: "PAGE",
			method: "POST",
			post: JSON.stringify(curB),
			get: "",
			content: "none"
	};
	var currentP = currentPreview();
	if( currentP['page'+number] == undefined ){
		$.ajax({
			url: "/==(language)==/assets/api.php", 
			type: "POST",
			dataType: "html",
			data: dataSub,
			success: function(res){
				var currentP = currentPreview();
				currentP["page"+number] = res;
				setcurrentPreview(currentP);
				console.log("OK");
				if( cont == true && amount > number ){
					loadPage(number+4,true);
				}
			},
			error: function(error){
				console.log("KO");
				console.log(error);
			}
		});
	}
}
*/
function editModel(id){
	var model = currentBook().characters[id];
	model.name = model.name[1];
	model.position = id;
	newChar(model);
	window.location.assign("==(MAT_url_customization)==");
}
function start(){
/*-- >> Huchun work */
    var currentB = currentBook();
    if(!isEmpty(currentB)){
		if( currentB.language == undefined ) currentB.language = "==(language)==";
		if ( currentB.photo != undefined && currentB.photo != "" ) {
			$('i.fas.fa-camera-retro').hide();
			imgData = currentB.photo;
			$('#imagePreview').css('background-image', 'url('+currentB.photo+')');
			$('#imagePreview').css('height', '318px');
		}

        if( currentB.dedication != undefined && currentB.dedication != "" ) $('#dedicatory').val(currentB.dedication);
        if(currentB.characters.length == undefined ) return;	
    }
}
function parseDedication( text ){
	var res = text.split(" ");
	var parrafo = [];
	var part = "";
	$.each( res, function( index, value ){
		//console.log("PART: "+part.length );
		//console.log("VALUE: "+value.length );
		if( part.length + value.length + 1 > 31 ){
			parrafo.push( part + "\n" );
			part = value;
		}else{
			part = part + " " + value;
		}
	});
	parrafo.push( part );
	var result = parrafo.join("");
	result = result.trim();
	return result;
}
var reader;
var counterTry = 0;
function ResizeImage() {
    var filesToUpload = document.getElementById('upload-photo').files;
    var file = filesToUpload[0];

    // Create an image
    var img = document.createElement("img");
	var canvas = document.createElement("canvas");
	//var ctx = canvas.getContext("2d");
	var width = 500;
	var height = 500;

    reader = new FileReader();

    reader.onload = function(e) {
		img.src = e.target.result;
	},
	reader.onloadend = function(e) {

		var MAX_WIDTH = 500;
		var MAX_HEIGHT = 500;
		inputWidth  = img.naturalWidth;
		inputHeight  = img.naturalHeight;
		var inputImageAspectRatio = inputWidth / inputHeight;
        var outputImageAspectRatio = 1;
		var outputWidth  = inputWidth;
		var outputHeight  = inputHeight;
		
		if (inputImageAspectRatio > outputImageAspectRatio) {
			outputWidth = inputHeight * outputImageAspectRatio;
		} else if (inputImageAspectRatio < outputImageAspectRatio) {
			outputHeight = inputWidth / outputImageAspectRatio;
		}

		var outputX = (inputWidth - outputWidth) * .5;
		var outputY = (inputHeight - outputHeight) * .5;

		canvas.width = MAX_WIDTH;
		canvas.height = MAX_HEIGHT;

console.log(outputX);
console.log(outputY);
console.log(outputWidth);
console.log(outputHeight);
	
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, outputX, outputY, outputWidth, outputHeight, 0, 0, MAX_WIDTH, MAX_HEIGHT );
		
		var dataurl = canvas.toDataURL("image/png");

		$('i.fas.fa-camera-retro').hide();
		$('#imagePreview').css('background-image', 'url('+dataurl+')');
		$('#imagePreview').css('height', '318px');
		$('.nextStep').hide();
		$('._nextStep').show();
		imgData = dataurl;
		
		if( imgData == "data:," && counterTry < 2){
			counterTry++;
			setTimeout(function(){ ResizeImage(); }, 1200);
			return;
		}

		var dedicatoryObj = {"language":lang }
		if( imgData != undefined ) dedicatoryObj.photo = imgData;
		var result = addTocurrentBook( dedicatoryObj );
		getNewRequest(0);
	}
    reader.readAsDataURL(file);
}
</script>