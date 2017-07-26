
// Get the combined size of the navigation bar and top image
function getHeaderSize(){
	// var nav_bar = document.getElementById("nav");
	// var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-img");
	var top_image_height = $(top_image).css('height');
	
	// var total_height = parseInt(nav_height) + parseInt(top_image_height);
	var total_height = parseInt(top_image_height);
	return total_height.toString() + "px";
}


window.onresize = function(event) {
    var top_image = document.getElementById("top-img");
	top_image.style.left = "0px";
	top_image.style.top = "0px";

	var article = document.getElementById("article");
	article.style.marginTop = "0px";
}

window.onscroll = function(event){
	var top_image = document.getElementById("top-img");
	top_image.style.position = "fixed";
	top_image.style.left = "0px";
	top_image.style.top = "0px";

	header_size = getHeaderSize();
	var article = document.getElementById("article");
	article.style.marginTop = header_size;
}



function init(){
}

init();