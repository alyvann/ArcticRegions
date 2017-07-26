
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
	// fix the position of the top image
    var top_image = document.getElementById("top-img");
	top_image.style.left = "0px";
	top_image.style.top = "0px";

	// correct the location of the article
	var article = document.getElementById("article");
	article.style.marginTop = "0px";
}


window.onscroll = function(event){
	// fix the position of the top image
	var top_image = document.getElementById("top-img");
	top_image.style.position = "fixed";
	top_image.style.left = "0px";
	top_image.style.top = "0px";

	// correct the location of the article 
	header_size = getHeaderSize();
	var article = document.getElementById("article");
	article.style.marginTop = header_size;
}


function onPageButtonClick(e){
	var dict = {"essay1": {"top_image": "images/TARI_1_desolation.jpeg", "article_content": "essay1.html"}, 
				"essay2": {"top_image": "images/TARI_2.Julianeshaab.jpg", "article_content": "essay2.html"},
				"essay3": {"top_image": "images/TARI_3.Kakortok.jpg", "article_content": "essay3.html"},
				"essay4": {"top_image": "images/TARI_4.1sermitsialik.jpg", "article_content": "essay4.html"},
				"essay5": {"top_image": "images/TARI_5.karsut.jpg", "article_content": "essay5.html"}};

	var element_id = e.target.id;

	if(element_id == "previous"){
		console.log("You've selected previous.");
		// determine which page to go to... 

	}else if(element_id == "next"){
		console.log("You've selected next.");
		// determine which page to go to...

	}else{	
		// updates the top image to the image corresponding with the correct page
		var new_image_src = dict[element_id]["top_image"];
		document.getElementById("curr-img").src = new_image_src;

		// load new article
		var new_content_doc = dict[element_id]["article_content"];
		$("#content").load(new_content_doc); 

	}
	
	// scroll to top of article
	window.scrollTo(0,0);
}

function init(){}

init();

