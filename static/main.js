$( document ).ready(function() {
  $(".post-item").on("mouseenter", function(a) {
    $(this).find(".videobg")[0].play();
    return false;
  })


  $(".post-item").on("mouseleave", function(a) {
    var html5_video = $(this).find(".videobg")[0];
    html5_video.pause();
    html5_video.currentTime = 0;
    // html5_video.load();
    return false;
  })
})