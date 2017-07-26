var essay_dict = {"essay1": {"top_image": "images/home_image.jpg", "article_content": "essay1.html"}, 
				"essay2": {"top_image": "images/TARI_1_desolation.jpeg", "article_content": "essay2.html"},
				"essay3": {"top_image": "images/TARI_2.Julianeshaab.jpg", "article_content": "essay3.html"},
				"essay4": {"top_image": "images/TARI_3.Kakortok.jpg", "article_content": "essay4.html"},
				"essay5": {"top_image": "images/TARI_4.1sermitsialik.jpg", "article_content": "essay5.html"},
				"essay6": {"top_image": "images/TARI_5.karsut.jpg", "article_content": "essay6.html"},
				"essay7": {"top_image": "images/TARI_6.devils.jpg", "article_content": "essay7.html"},
				"essay8": {"top_image": "images/TARI_7.75N.jpg", "article_content": "essay8.html"},
				"essay9": {"top_image": "images/TARI_8.godhavn.jpg", "article_content": "essay9.html"},
				"essay10": {"top_image": "images/TARI_9.jacobshavn.jpg", "article_content": "essay10.html"}
				};

var curr_essay_num = 1;


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


// handles all page navigation
function onPageButtonClick(e){
	var element_id = e.target.id;
	var toUpdate = true;

	//unhighlight the current page button div
	var current_button_div = document.getElementById("essay" + curr_essay_num.toString() + "-button-div");
	current_button_div.classList.remove("active");

	// update the gloabl current essay num
	if (element_id == "previous") {
		if (curr_essay_num == 1) {
			toUpdate = false;
		} else {
			curr_essay_num -= 1;
			element_id = "essay" + curr_essay_num;
		}

	} else if(element_id == "next") {
		if (curr_essay_num == 10){
			toUpdate = false;
		} else {
			curr_essay_num += 1;
			element_id = "essay" + curr_essay_num;
		}

	} else {
		var essay_selected_num = parseInt(element_id.match(/\d+$/));
		curr_essay_num = essay_selected_num;
	}

	// update the current page if necessary
	if (toUpdate){
		// updates the top image to the image corresponding with the correct page
		var new_image_src = essay_dict[element_id]["top_image"];
		document.getElementById("curr-img").src = new_image_src;

		// load new article
		var new_content_doc = essay_dict[element_id]["article_content"];
		$("#content").load(new_content_doc); 

		// scroll to top of article
		window.scrollTo(0,0);
	}

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


// Initializes the page with the first essay
function init(){
	// load first essay
	var first_essay_doc = essay_dict["essay1"]["article_content"];
	$("#content").load(first_essay_doc); 

	// disable the previous button
	var prev_button = document.getElementById("previous-button-div");
	prev_button.className += " disabled";

	// highlight the current page selected... 
	var first_essay_button_div = document.getElementById("essay1-button-div");
	first_essay_button_div.className += " active";
}

init();

