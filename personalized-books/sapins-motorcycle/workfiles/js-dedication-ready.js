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