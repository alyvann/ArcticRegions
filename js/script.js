var essay_dict = {"essay1": {"top_image": "images/HistoryEssay_ColtonMap.jpg", "article_content": "essays/essay1.html"}, 
				"essay2": {"top_image": "images/TARI_1.CapeDesolation.jpg", "article_content": "essays/essay2.html"},
				"essay3": {"top_image": "images/TARI_2.Julianeshaab.jpg", "article_content": "essays/essay3.html"},
				"essay4": {"top_image": "images/TARI_3.Kakortok.jpg", "article_content": "essays/essay4.html"},
				"essay5": {"top_image": "images/TARI_4.sermitsialik.jpg", "article_content": "essays/essay5.html"},
				"essay6": {"top_image": "images/TARI_5.karsut.jpg", "article_content": "essays/essay6.html"},
				"essay7": {"top_image": "images/TARI_6.devils.jpg", "article_content": "essays/essay7.html"},
				"essay8": {"top_image": "images/TARI_7.75N.jpg", "article_content": "essays/essay8.html"},
				"essay9": {"top_image": "images/TARI_8.godhavn.jpg", "article_content": "essays/essay9.html"},
				"essay10": {"top_image": "images/TARI_9.homewardbound.jpg", "article_content": "essays/essay10.html"}
				};

var curr_essay_num = 1;


// Get the combined size of the navigation bar and top image
function getHeaderSize(){
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	var top_image_height = $(top_image).css('height');
	
	var total_height = parseInt(nav_height) + parseInt(top_image_height);
	return total_height.toString() + "px";
}


window.onresize = function(event) {
	// fix the position of the top image
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

    var top_image = document.getElementById("top-images");
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// correct the location of the article
	var article = document.getElementById("article");
	article.style.marginTop = "0px";

}


window.onscroll = function(event){
	// fix the position of the top image
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// correct the location of the article 
	header_size = getHeaderSize();
	var article = document.getElementById("article");
	article.style.marginTop = header_size;

}


function openModal(){
	var curr_essay = "essay" + curr_essay_num.toString();
	var curr_image = essay_dict[curr_essay]["top_image"];
	$('#img-modal img').attr('src', curr_image); 
}


function updateSideImages(){
	if(curr_essay_num > 1){ // update previous image
		var prev_essay = "essay" + (curr_essay_num - 1).toString();
		var prev_essay_image = essay_dict[prev_essay]["top_image"];
		document.getElementById("left-image").src = prev_essay_image;

	} else {
		document.getElementById("left-image").src = "images/HomePage_ArcticRegionsCover.jpg";
	}

	if(curr_essay_num < 10){ // update next image
		var next_essay = "essay" + (curr_essay_num + 1).toString();
		var next_essay_image = essay_dict[next_essay]["top_image"];
		document.getElementById("right-image").src = next_essay_image;

	} else {
		document.getElementById("right-image").src = "images/HomePage_ArcticRegionsCover.jpg";
	}
}


function pageUpdates(element_id){
	// updates the top image to the image corresponding with the correct page
	var new_image_src = essay_dict[element_id]["top_image"];
	document.getElementById("main-image").src = new_image_src;

	// load new article
	var new_content_doc = essay_dict[element_id]["article_content"];
	$("#content").load(new_content_doc); 

	// scroll to top of article
	window.scrollTo(0,0);

	updateSideImages();

	// enable or disable the previous and next buttons
	var prev_button = document.getElementById("previous-button-div");
	var next_button = document.getElementById("next-button-div");

	if (curr_essay_num == 1) { 
		prev_button.className += " disabled";
	} else {
		prev_button.classList.remove("disabled");
	}

	if (curr_essay_num == 10) {
		next_button.className += " disabled";
	} else {
		next_button.classList.remove("disabled");
	}

	// highlight the current page button div
	if (element_id != "previous" && element_id != "next"){
		var updated_button_div = document.getElementById(element_id + "-button-div");
		updated_button_div.className += " active";
	}
}


function updateEssay(e){
	var clicked_element_id = e.target.id;
	var to_update = true;
	var essay_id = "";

	if (clicked_element_id == "left-image" || clicked_element_id == "previous"){
		if (curr_essay_num == 1) {
			to_update = false;
		} else{
			curr_essay_num -= 1;
			essay_id = "essay" + curr_essay_num;
		}

	} else if (clicked_element_id == "right-image" || clicked_element_id == "next"){
		if (curr_essay_num == 10){
			to_update = false;
		} else{
			curr_essay_num += 1;
			essay_id = "essay" + curr_essay_num;
		}
	} else {
		var essay_selected_num = parseInt(clicked_element_id.match(/\d+$/));
		curr_essay_num = essay_selected_num;
		essay_id = "essay" + curr_essay_num;
	}

	if (to_update){
		pageUpdates(essay_id);
	}
}


// handles all page navigation
function onPageButtonClick(e){
	// // unhighlight the current page button div
	// var current_button_div = document.getElementById("essay" + curr_essay_num.toString() + "-button-div");
	// current_button_div.classList.remove("active");

	updateEssay(e);
}


// Initializes the page with the first essay
function init(){
	// fix top image below navigation bar
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	top_image.style.position = "fixed";
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// correct the location of the article 
	header_size = getHeaderSize();
	var article = document.getElementById("article");
	article.style.marginTop = header_size;

	// load first essay
	var first_essay_doc = essay_dict["essay1"]["article_content"];
	$("#content").load(first_essay_doc); 

	// disable the previous button
	var prev_button = document.getElementById("previous-button-div");
	prev_button.className += " disabled";

	// highlight the current page selected... 
	var first_essay_button_div = document.getElementById("essay1-button-div");
	first_essay_button_div.className += " active";

	// insert side images
	var left_image_src = "images/HomePage_ArcticRegionsCover.jpg"
	var right_image_src = essay_dict["essay2"]["top_image"];
	document.getElementById("right-image").src = right_image_src;
	document.getElementById("left-image").src = left_image_src;

}

init();

