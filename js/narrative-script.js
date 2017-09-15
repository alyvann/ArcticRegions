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
    article.style.marginLeft = parseInt(map_width) + document.body.clientWidth*0.05 + "px";

    var width = getMapWidth();
    var height = getMapHeight();
    create_map(width, height, 1);
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
    var essay_id = getCurrEssayId();
    document.getElementById("main-image").src = essay_dict[essay_id]["top_image"];
}

function updateArticle(){
	// load new article
	var new_content_doc = essay_dict[getCurrEssayId()]["article_content"];
	$("#content").load(new_content_doc);

    // scroll to top of article
    window.scrollTo(0,0);
}

function updatePageNavigation(){
    // enable or disable the previous and next buttons
    var prev_button = document.getElementById("previous-button-div");
    var next_button = document.getElementById("next-button-div");

    if (curr_essay_num == 1) {
        prev_button.className += " disabled";
       	$('#previous').attr('style', 'color: grey');

    } else {
        prev_button.classList.remove("disabled");
        $('#previous').attr('style', 'color: black');
    }

    if (curr_essay_num == 10) {
        next_button.className += " disabled";
        $('#next').attr('style', 'color: grey');

    } else {
        next_button.classList.remove("disabled");
        $('#next').attr('style', 'color: black');
    }
}

function updateEssay(e){
	var clicked_element_id = e.target.id;
	var to_update = true;

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
        updatePageNavigation();
        create_map(getMapWidth(), getMapHeight(), curr_essay_num);
	}
}

function hide_map_paths(){
	for (i=2; i<=9; i++){ //UPDATE THIS WHEN HAVE ALL THE PATHS!! i=1; i<=10;
		var path_id = "#essay" + i + "-path";
		var path = document.querySelector(path_id);

		path.style.visibility = "hidden";

		// if (i == curr_essay_num) {
		// 	path.style.visibility = "visible";
		// } else {
		//	path.style.visibility = "hidden";
		// }
 	}
}

function create_map(width, height, essay_num){
	var map_div = document.getElementById("map-svg");
    map_div.style.height = height;

    hide_map_paths();
}

window.addEventListener("scroll", function(e){
	if (curr_essay_num != 1 && curr_essay_num != 10){ //DELETE THIS WHEN HAVE ALL THE PATHS!!
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
	}
});


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
    create_map(width, height, 1);

    // place main image
    var map_width = $('#map-svg').css('width');
    var main_image_container = document.getElementById("main-image-div");
    main_image_container.style.left = map_width;
    main_image_container.style.top = header_size;

    // correct the location of the article
    var article = document.getElementById("content");
    article.style.marginLeft = parseInt(map_width) + document.body.clientWidth*0.05 + "px";
    article.style.marginTop = (parseInt(header_size) + parseInt($("#main-image-div").css('height'))).toString() + "px";

    // load first essay
    var first_essay_doc = essay_dict["essay1"]["article_content"];
    $("#content").load(first_essay_doc);
    updatePageNavigation();


    // TESTING ZOOMING !! 
    var panZoomTiger = svgPanZoom('#map-svg');
	panZoomTiger.zoomAtPoint(2, {x: 75, y: 100});
    console.log('ahhh!');
}

init();
