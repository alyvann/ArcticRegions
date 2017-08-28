var videoAspectRatio;

function adjust() {
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var viewportAspectRatio = viewportWidth / viewportHeight;

    if (viewportAspectRatio > videoAspectRatio) {

        // Very-wide viewport, so use the width
        $player.css({width: viewportWidth + 'px', height: 'auto'});

        // Position the video as needed
        // ...
    }
    else {
        // Very-tall viewport, so use the height
        $player.css({width: 'auto', height: viewportHeight + 'px'});

        // Position the video as needed
        // ...
    }
}

$(document).ready(function(){
    // Get the aspect ratio of the video
    videoAspectRatio = $player.width() / $player.height();
    adjust();
});

$(window).resize(function(){ adjust(); });