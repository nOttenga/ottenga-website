

enquire.register("screen and (min-width: 1024px)", {
    match : function() {
        $.stellar();
    },
    unmatch : function() {
        // Hide the sidebar
    }
});

enquire.register("screen and (max-width: 768px)", {
    match : function() {

    },
    unmatch : function() {
        // Hide the sidebar
    }
});


function abso() {

      $('#parallax-image, #parallax-mask').css({
          position: 'absolute',
          width: $(window).width(),
          height: $(window).height()
      });

  }


$(document).ready(function() {



  new WOW().init();

  $('#footer-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });






    //abso();




});

$(window).load(function () {
    //alert('page is loaded');





});


enquire
