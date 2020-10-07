<script>
	var currentC = currentChar();
	if ( currentC == false ){
		var currentCharToCustom = protagonist;
		var currentCharID = thisBook.characters[currentCharToCustom].id;
		setLayers();
		nextChar();
	}else{
		var currentCharToCustom = currentC.position;
		if( currentCharToCustom == undefined ) currentCharToCustom = protagonist;
		var currentCharID = thisBook.characters[currentCharToCustom].id;
		setLayers();
		$(".charsBreadCurrent"+currentCharToCustom).removeClass("d-none");
		if( currentC.name != "Materlu" ){
			$("#character_name").val(currentC.name);
		}
		var currentGender = currentC.gender_origin;
		if( currentGender == undefined ) currentGender = "chica";

		var thisGender = defaultModel[currentGender+currentCharToCustom].gender;
		currentC.gender = thisGender;

		if( currentGender == "chico" ){
			setChico();
			drawModel( defaultModel["chica"+currentCharToCustom] );
			drawModel( currentC );
		}else{
			setChica();
			drawModel( defaultModel["chico"+currentCharToCustom] );
			drawModel( currentC );
		}
		
		var url = document.URL.split("#next");
		if( url.length == 2 && amountChar == 1){
			endCharacter();
		}else{
			//drawModel();
			if( $("#character_name").val() != "" ){
				$(".step-1").addClass("hidden");
				$(".step-2").removeClass("hidden");
				//drawControls();
				selectCurrentControls();
//				$(".customization-dot").removeClass("d-none");
//				$(".customization-dot-title").addClass("d-none");  
//				$(".leftOptions").find("button:first").find(".customization-dot").addClass("d-none");
//				$(".leftOptions").find("button:first").find(".customization-dot-title").removeClass("d-none");   
			}
		}
	}
	var currentGenderChar = currentChar().gender;
	drawSaved();
	
	try {
		for(var i=1;i<amountChar;i++){
			var pencil = "";
			var arrow = "d-none";
			if (i == currentCharToCustom){
				pencil = "d-none"; 
				arrow = "";
			}
			$(".charsBreadcBox").append(
				'<a class="d-flex flex-column align-items-center mx-sm-3 mx-1 charsBreadc" href="#" data-id="'+i+'"><span class="position-absolute '+pencil+' charsBreadCurrent charsBreadCurrent'
				+i+'"><i class="fas fa-pencil-alt edit-character edit-first-character"></i></span><img src="==(MAT_cdn2)==img/models/second-character-unknown.png" class="breadcrumb-character" alt="'
				+thisBook.characters[i].kind+'"><span class="breadcrumb-charactername charName charName'
				+i+'">'
				+thisBook.characters[i].kind+'</span><span class="breadcrumb-selected '+arrow+' charsBreadCurrent charsBreadCurrent'
				+i+'"></span></a>'
			);
		}
	}catch(e){
		console.log("Error adding breadcrump");
	}
	addBreadcrumpChar();
	selectCurrentControls();
</script>