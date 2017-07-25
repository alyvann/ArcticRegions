//     <script type="text/javascript" src="jquery.sticky.js"></script>
// $(function(){
// 	$("top-img-div").sticky({topSpacing:0});
// });

window.onresize = function(event) {
    var top_image = document.getElementById("top-img");
    top_image.style.position = null;
	top_image.style.left = "0px";
	top_image.style.top = "0px";
};

window.onscroll = function(event){
	console.log("SCROLL");
	var top_image = document.getElementById("top-img");
	top_image.style.position = "fixed";
	top_image.style.left = "0px";
	top_image.style.top = "0px";
}