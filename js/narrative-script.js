//BUG: map needs to be resized when new essay clicked...


/*********************
	Global Variables
**********************/
var curr_essay_num = 1;
var essay_dict = {"essay1": {"top_image": "images/HistoryEssay_ColtonMap_smaller.jpg", "article_content": "essays/essay1.html"},
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
	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map");
	map_container.style.left = "0px";
	map_container.style.top = header_size.toString() + "px";

    // correct location of the main image
    var map_width = $('#map-svg').css('width');
    var main_image_container = document.getElementById("main-image-div");
    main_image_container.style.left = map_width;
    main_image_container.style.top = header_size.toString() + "px";

    // correct the location of the article
    var article = document.getElementById("content");
    article.style.marginTop = (header_size + document.getElementById("main-image-div").clientHeight).toString() + "px";
    article.style.marginLeft = map_width.toString() + "px";

};

window.onscroll = function(){
	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map");
	map_container.style.left = "0px";
	map_container.style.top = header_size.toString() + "px";

	// correct the location of the article 
	var article = document.getElementById("content");
    article.style.marginTop = (header_size + document.getElementById("main-image-div").clientHeight).toString() + "px";
};

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
	
	return parseInt(nav_height) + parseInt(top_image_height);
}

function getMapHeight(){
	var header_size = getHeaderSize();
	return $(window).height() - header_size;
}

function getMapWidth(){
	return parseInt($(window).width()) * 0.33;
}

function getCurrEssayId(){
	return "essay" + curr_essay_num.toString();
}

function updateImages(){
	// updates the top image to the image corresponding with the correct page
	document.getElementById("main-image").src = essay_dict[getCurrEssayId()]["top_image"];
}

function updateArticle(){
	// load new article
	var new_content_doc = essay_dict[getCurrEssayId()]["article_content"];
	$("#content").load(new_content_doc);

    // scroll to top of article
    window.scrollTo(0,0);
}

function updateEssay(e){
	var clicked_element_id = e.target.id;

	// // update the curr_essay_num global variable
	// if (clicked_element_id == "previous"){
	// 	if (curr_essay_num == 1) {
	// 		to_update = false;
	// 	} else{
	// 		curr_essay_num -= 1;
	// 	}
	// } else if (clicked_element_id == "next"){
	// 	if (curr_essay_num == 10){
	// 		to_update = false;
	// 	} else{
	// 		curr_essay_num += 1;
	// 	}
	// } else {
	//	curr_essay_num = parseInt(clicked_element_id.match(/\d+$/));
	// }

    curr_essay_num = parseInt(clicked_element_id.match(/\d+$/));
	updateImages();
	updateArticle();
    create_map(getMapWidth(), getMapHeight(), curr_essay_num);
}

function create_map(width, height, essay_num){
	queue()
	  .defer(d3.json, "json/world-50m.json")
	  .defer(d3.json, "json/coast.topojson")
	  .await(drawMap);

	var svg = d3.select('#map-svg');

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
		svg.insert("path", ".graticule")
			.datum(topojson.feature(world, world.objects.land))
			.attr("class", "land")
			.attr("d", path);

		svg.insert("path", ".graticule")
			.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
			.attr("class", "boundary")
			.attr("d", path);

		// select part of the coast to be drawn (corresponding to essay)
		coastline.objects.coast.geometries[0]["arcs"] = [[essay_num-1]];

		// Select our coastline objects
		var route = topojson.feature(coastline, coastline.objects['coast']);

		// Make a group for features
		var greenland_coast = svg.append('g');

		// Add coastline data
		var p = greenland_coast.selectAll('.coastline')
						.data(route.features)
						.enter().append('path')
						.attr('class', 'coastline')
						.attr('d', path);

		var totalLength = p.node().getTotalLength(); //d3.select('path')

	    p.attr("stroke-dasharray", totalLength + " " + totalLength)
	      .attr("stroke-dashoffset", totalLength)
	      .transition()
	        .duration(2000)
	        .ease("linear")
	        .attr("stroke-dashoffset", 0);
	}
}


/*********************
	Initialization
**********************/
function init() {
    // fix thumbnails below navigation bar
    var nav_bar = document.getElementById("nav");
    var nav_height = $(nav_bar).css('height');
    var top_image = document.getElementById("top-images");
    top_image.style.left = "0px";
    top_image.style.top = nav_height;

    // fix position of map
    var header_size = getHeaderSize().toString() + "px";
    var map_div = document.getElementById("map");
    map_div.style.left = "0px";
    map_div.style.top = header_size;

    // Create map svg
    var width = getMapWidth();
    var height = getMapHeight();

    d3.select('#map').append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'map-svg');

    create_map(width, height, 1);

    // place main image
    var map_width = $('#map-svg').css('width');
    var main_image_container = document.getElementById("main-image-div");
    main_image_container.style.left = map_width;
    main_image_container.style.top = header_size;

    // correct the location of the article
    var article = document.getElementById("content");
    article.style.marginLeft = map_width;
    article.style.marginTop = (parseInt(header_size) + parseInt($("#main-image-div").css('height'))).toString() + "px";

    // load first essay
    var first_essay_doc = essay_dict["essay1"]["article_content"];
    $("#content").load(first_essay_doc);
}

init();