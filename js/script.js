/*********************
	Global Variables
**********************/
var curr_essay_num = 1;
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


/*********************
	Listeners
**********************/
window.onresize = function() {
	// fix the position of the top image
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

    var top_image = document.getElementById("top-images");
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map-container");
	map_container.style.left = "0px";
	map_container.style.top = header_size;

	// correct the location of the article
	var article = document.getElementById("article");
	article.style.marginTop = "0px";
	article.style.marginLeft = (parseInt($(map_container).css('width')) * 2.0).toString() + "px"; // FIX THIS !!!

	// re-scale/re-draw the map // DO THIS!!! 
}

window.onscroll = function(){
	// fix the position of the top image
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map-container");
	map_container.style.left = "0px";
	map_container.style.top = header_size;

	// correct the location of the article 
	var article = document.getElementById("article");
	article.style.marginTop = header_size;
}

// Handles all page navigation updates
function onPageButtonClick(e){
	updateEssay(e);
}

function openModal(){
	var curr_essay = "essay" + curr_essay_num.toString();
	var curr_image = essay_dict[curr_essay]["top_image"];
	$('#img-modal img').attr('src', curr_image); 
}


/*********************
	Other Functions
**********************/

// Get the combined size of the navigation bar and top image container
function getHeaderSize(){
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	var top_image_height = $(top_image).css('height');
	
	var total_height = parseInt(nav_height) + parseInt(top_image_height);
	return total_height.toString() + "px";
}

function getMapHeight(){
	var header_size = parseInt(getHeaderSize());
	return $(window).height() - header_size;
}

function getCurrEssayId(){
	return "essay" + curr_essay_num.toString();
}

function updateImages(){
	// updates the top image to the image corresponding with the correct page
	var new_image_src = essay_dict[getCurrEssayId()]["top_image"];
	document.getElementById("main-image").src = new_image_src;

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

function updateArticle(){
	// load new article
	var new_content_doc = essay_dict[getCurrEssayId()]["article_content"];
	$("#content").load(new_content_doc); 

	// scroll to top of article
	window.scrollTo(0,0);
}

function updatePageNavigation(){
		// highlight the current page button div
		var updated_button_div = document.getElementById(getCurrEssayId() + "-button-div");
		updated_button_div.className += " active";

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
}

function updateEssay(e){
	// // unhighlight the current page button div
	// var current_button_div = document.getElementById("essay" + curr_essay_num.toString() + "-button-div");
	// current_button_div.classList.remove("active");

	var clicked_element_id = e.target.id;
	var to_update = true;

	// update the curr_essay_num global variable
	if (clicked_element_id == "left-image" || clicked_element_id == "previous"){
		if (curr_essay_num == 1) {
			to_update = false;
		} else{
			curr_essay_num -= 1;
		}
	} else if (clicked_element_id == "right-image" || clicked_element_id == "next"){
		if (curr_essay_num == 10){
			to_update = false;
		} else{
			curr_essay_num += 1;
		}
	} else {
		var essay_selected_num = parseInt(clicked_element_id.match(/\d+$/));
		curr_essay_num = essay_selected_num;
	}

	if (to_update){
		updateImages();
		updateArticle();
		updatePageNavigation();
	}
}

function map(){
	queue()
	  .defer(d3.json, "json/world-50m.json")
	  .defer(d3.json, "json/coast.topojson")
	  .await(drawMap);

	// Defaults
	var map_div = document.getElementById("map")
	var width = parseInt($(window).width()) * 0.45;
	var height = getMapHeight();

	var svg = d3.select('#map').append('svg')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('id', 'map-svg');

	// Projection information
	var projection = d3.geo.stereographic()
	  .scale(2500)
	  .translate([width / 2, height / 2])
	  .rotate([50, -70])
	  .clipAngle(180 - 1e-4)
	  .clipExtent([[0, 0], [width, height]])
	  .precision(.1);

	var path = d3.geo.path()
	    .projection(projection);

	function drawMap(error, world, coastline) {
		if (error) throw error;

		// Draw world countries and borders
		// svg.insert("path", ".graticule")
		// 	.datum(topojson.feature(world, world.objects.land))
		// 	.attr("class", "land")
		// 	.attr("d", path);

		// svg.insert("path", ".graticule")
		// 	.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
		// 	.attr("class", "boundary")
		// 	.attr("d", path);

		// Select our coastline objects
		var route = topojson.feature(coastline, coastline.objects['coast']);

		// Make a group for features
		var greenland_coast = svg.append('g');

		// Add coastline data
		greenland_coast.selectAll('.coastline')
						.data(route.features)
						.enter().append('path')
						.attr('class', 'coastline')
						.attr('d', path);

	}
}


/*********************
	Initialization
**********************/
function init(){
	// fix top image below navigation bar
	var nav_bar = document.getElementById("nav");
	var nav_height = $(nav_bar).css('height');

	var top_image = document.getElementById("top-images");
	top_image.style.position = "fixed";
	top_image.style.left = "0px";
	top_image.style.top = nav_height;

	// fix position of map
	var map_container = document.getElementById("map-container");
	map_container.style.position = "fixed";
	map_container.style.left = "0px";
	map_container.style.top = getHeaderSize();


	// correct the location of the article 
	header_size = getHeaderSize();
	var article = document.getElementById("article");
	article.style.marginTop = header_size;
	article.style.marginLeft = (parseInt($(map_container).css('width')) * 2.0).toString() + "px"; // FIX THIS !!!

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

	map();
}


init();

