<script>
var url = document.URL.split("#next");
</script>
<!-- >> Huchun work -->
<script>
    var lang = 'es'; var imgData = "";
    //init
</script>
<!-- << Huchun work -->

<script>
if( url.length == 2 && currentChar() != false ){
	var thisCurrentBook = {"storyId": thisbook, "characters": [] };
	setcurrentBook( thisCurrentBook );
	addCurrentCharToCurrentBook();
}else if ( isEmpty( currentBook() ) == true ) {
	window.location.assign(".");
}
var thisCurrentBook = currentBook();
for(var i=0;i<thisCurrentBook.characters.length;i++){
	delete thisCurrentBook.characters[i].src;
	if( typeof(thisCurrentBook.characters[i].name) == "string"){
		var nameId = books['b'+thisbook].characters[i].option.name;
		thisCurrentBook.characters[i].name = [ nameId, characters[i].name ];
	}
}
thisCurrentBook.storyId = thisbook;
setcurrentBook(thisCurrentBook);
start();
create7LayersIMG();
</script>
<script defer>
    setcurrentPreview();
	getNewRequest(1);
</script>