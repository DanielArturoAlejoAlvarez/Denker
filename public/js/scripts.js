$(function() {
    effectSlideWithOpacityIntro();
})


function effectSlideWithOpacityIntro() {
    $("body").hover(function() {
        $(".denker-app").slideDown(1000);
        $(".intro").css({"opacity": 0, "transition": "all .3s ease-in-out"});
    }, function() {
        $(".denker-app").slideUp(1000);
        $(".intro").css({"opacity": 1})
    })
}

