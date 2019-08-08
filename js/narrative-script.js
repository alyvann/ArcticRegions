/*********************
	Global Variables
**********************/
var curr_essay_num = 1;
var essay_dict = {"essay1": {"top_image": "images/HistoryEssay_ColtonMap_smaller.jpg", "article_content": "essays/essay1.html", "caption": "Colton"},
				"essay2": {"top_image": "images/TARI_1.CapeDesolation.jpg", "article_content": "essays/essay2.html", "caption": "caption2"},
				"essay3": {"top_image": "images/TARI_2.Julianeshaab.jpg", "article_content": "essays/essay3.html", "caption": "caption3"},
				"essay4": {"top_image": "images/TARI_3.Kakortok.jpg", "article_content": "essays/essay4.html", "caption": "caption4"},
				"essay5": {"top_image": "images/TARI_4.sermitsialik.jpg", "article_content": "essays/essay5.html", "caption": "caption5"},
				"essay6": {"top_image": "images/TARI_5.karsut.jpg", "article_content": "essays/essay6.html", "caption": "caption6"},
				"essay7": {"top_image": "images/TARI_6.devils.jpg", "article_content": "essays/essay7.html", "caption": "caption7"},
				"essay8": {"top_image": "images/TARI_7.75N.jpg", "article_content": "essays/essay8.html", "caption": "caption8"},
				"essay9": {"top_image": "images/TARI_8.godhavn.jpg", "article_content": "essays/essay9.html", "caption": "caption9"},
				"essay10": {"top_image": "images/TARI_9.homewardbound.jpg", "article_content": "essays/essay10.html", "caption": "caption10"}
				};


/*********************
	Listeners
**********************/
window.onresize = function() {
	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map-svg");
	map_container.style.left = "0px";
	map_container.style.top = header_size.toString() + "px";

    // correct location of the main image
    var map_width = $('#map-svg').css('width');

    // correct the location of the article
    var article = document.getElementById("content");
    article.style.marginTop = (10+header_size).toString() + "px";
    article.style.marginLeft = (parseInt(map_width)*0.6).toString() + "px";

    create_map(getMapHeight());
};

window.onscroll = function(){
	// keep map floating at the top
	var header_size = getHeaderSize();
	var map_container = document.getElementById("map");
	map_container.style.left = "0px";
	map_container.style.top = header_size.toString() + "px";

	// correct the location of the article 
	var article = document.getElementById("content");
    article.style.marginTop = (10+header_size).toString()+ "px";

    // path drawing on scroll
    var path_id = "#essay" + curr_essay_num + "-path";
	var path = document.querySelector(path_id);
	var pathLength = path.getTotalLength();
	path.style.visibility = "visible";

	path.style.strokeDasharray = pathLength + ' ' + pathLength;
	path.style.strokeDashoffset = pathLength;
	path.getBoundingClientRect();

	var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
	var drawLength = pathLength * scrollPercentage;

	path.style.strokeDashoffset = pathLength - drawLength;

	if (scrollPercentage >= 0.99) {
	  path.style.strokeDasharray = "none";
	} else {
	  path.style.strokeDasharray = pathLength + ' ' + pathLength;
	}
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
	return $('#map-svg').css('width');
}

function getCurrEssayId(){
	return "essay" + curr_essay_num.toString();
}

function updateImages(){
	// updates the top image to the image corresponding with the correct page
    var essay_id = getCurrEssayId();
}

function updateArticle(){
	// load new article
	var new_content_doc = essay_dict[getCurrEssayId()]["article_content"];
	$("#content").load(new_content_doc);

    // scroll to top of article
    window.scrollTo(0,0);
}

function updatePageNavigation(prev_essay_num){
	var prev_essay_image = document.getElementById("essay" + prev_essay_num.toString());
	prev_essay_image.style.borderBottom = "none";

	var curr_essay_image = document.getElementById(getCurrEssayId());
	curr_essay_image.style.borderBottom = "thick solid #a81c1c"; 

    // // enable or disable the previous and next buttons
    // var prev_button = document.getElementById("previous-button-div");
    // var next_button = document.getElementById("next-button-div");

    // if (curr_essay_num == 1) {
    //     prev_button.className += " disabled";
    //    	$('#previous').attr('style', 'color: grey');

    // } else {
    //     prev_button.classList.remove("disabled");
    //     $('#previous').attr('style', 'color: black');
    // }

    // if (curr_essay_num == 10) {
    //     next_button.className += " disabled";
    //     $('#next').attr('style', 'color: grey');

    // } else {
    //     next_button.classList.remove("disabled");
    //     $('#next').attr('style', 'color: black');
    // }
}

function updateEssay(e){
	var clicked_element_id = e.target.id;
	var to_update = true;
	var prev_essay_num = curr_essay_num;

	// update the curr_essay_num global variable
	if (clicked_element_id == "previous"){
		if (curr_essay_num == 1) {
			to_update = false;
		} else{
			curr_essay_num -= 1;
		}
	} else if (clicked_element_id == "next"){
		if (curr_essay_num == 10){
			to_update = false;
		} else{
			curr_essay_num += 1;
		}
	} else {
		curr_essay_num = parseInt(clicked_element_id.match(/\d+$/));
	}

	if(to_update){
        updateImages();
        updateArticle();
        updatePageNavigation(prev_essay_num);
        create_map(getMapHeight());
        panZoom();
	}
}

function hide_map_paths(){
	for (i=1; i<=10; i++){ 
		var path_id = "#essay" + i + "-path";
		var path = document.querySelector(path_id);

		if (i != curr_essay_num) {
			path.style.visibility = "hidden";
		}
 	}
}

function hide_progress_paths(){
	for (ii=3; ii<=10; ii++){ 
		var progress_id = "#essay" + ii + "-progress";
		var progress = document.querySelector(progress_id);
		progress.style.visibility = "visible";
		if (ii != curr_essay_num) {
			progress.style.visibility = "hidden";
		}
	}
}

function create_map(height){
	var map_div = document.getElementById("map-svg");
    map_div.style.height = height;

    hide_map_paths();
    hide_progress_paths();
}

// window.addEventListener("scroll", function(e){
//  	var path_id = "#essay" + curr_essay_num + "-path";
// 	var path = document.querySelector(path_id);
// 	var pathLength = path.getTotalLength();
// 	path.style.visibility = "visible";

// 	path.style.strokeDasharray = pathLength + ' ' + pathLength;
// 	path.style.strokeDashoffset = pathLength;
// 	path.getBoundingClientRect();

// 	var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
// 	var drawLength = pathLength * scrollPercentage;

// 	path.style.strokeDashoffset = pathLength - drawLength;

// 	if (scrollPercentage >= 0.99) {
// 	  path.style.strokeDasharray = "none";
// 	} else {
// 	  path.style.strokeDasharray = pathLength + ' ' + pathLength;
// 	}
// });


/*************
	Zooming
**************/
function panZoom() {
	var svg = d3.select("#map-svg")
	svg
		.transition()
		.attr("transform", transform())
		.duration(2000);
	
	function transform() {
		if (curr_essay_num >= 3 && curr_essay_num <= 6) {
			return "translate(" + 200 + "," + -400 + ")scale(" + 2 + ")";
		} else if (curr_essay_num >=7 && curr_essay_num <= 9) {
			return "translate(" + 150 + "," + 200 + ")scale(" + 1.5 + ")";
		} else {
			return "translate(" + 0 + "," + 0 + ")scale(" + 1 + ")";
		}
	}
}

/*********************
	Initialization
**********************/
function uncover(){
	$("#cover").hide();
}

function init(callback) {
    // fix thumbnails below navigation bar
    var nav_bar = document.getElementById("nav");
    var nav_height = $(nav_bar).css('height');
    var top_image = document.getElementById("top-images");
    top_image.style.left = "0px";
    top_image.style.top = nav_height;

    // fix position of map
    var header_size = getHeaderSize().toString() + "px";
    var map_div = document.getElementById("map-svg");
    map_div.style.left = "0px";
    map_div.style.top = header_size;

    var map_div = document.getElementById("map");
    map_div.style.left = "0px";
    map_div.style.top = header_size;

    // Create map svg
    var map_width = getMapWidth();
    var map_height = getMapHeight();
    create_map(map_height);

    var path_id = "#essay1-path";
    var path = document.querySelector(path_id);
	path.style.visibility = "hidden";
	

    // correct the location of the article
    var article = document.getElementById("content");
    article.style.marginLeft = (parseInt(map_width)*0.3).toString() + "px"; //+ document.body.clientWidth*0.05 
    article.style.marginTop = (10+parseInt(header_size)).toString() + "px";

    // load first essay
    var first_essay_doc = essay_dict["essay1"]["article_content"];
    $("#content").load(first_essay_doc);
    updatePageNavigation(curr_essay_num);

    window.scrollTo(0,0);

    callback();
}

init(uncover);


// Add gradient to right side of map svg
// var svg_defs = d3.select("#map-svg");

// var gradient = svg_defs.append("linearGradient")
//     .attr("id", "gradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "0%")
//     .attr("spreadMethod", "pad");

// gradient.append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "white")
//     .attr("stop-opacity", 0);

// gradient.append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "white")
//     .attr("stop-opacity", 1);

// svg_defs.append("rect")
//     .attr("width", map_height)
//     .attr("height", map_width)
//     .style("fill", "url(#gradient)");


// ZOOMING !! 
// var panZoom = svgPanZoom('#map-svg');
// panZoom.zoomBy(1.3);
// panZoom.panBy({x: map_width, y: map_height});
