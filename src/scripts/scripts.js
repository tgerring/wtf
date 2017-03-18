/* Custom Scrollbar */
jQuery(document).ready(function ($) {
    "use strict";
    $('.workspace>.content .pagearea>div.bottom').perfectScrollbar();
});

/* Flip Effect */
var Page = (function() {
    var config = {
        $bookBlock : $( '#bb-bookblock' )
    },
    init = function() {
        config.$bookBlock.bookblock( {
            orientation: 'vertical',
            speed : 1000,
            shadowSides : 0,
            shadowFlip : 0,
      onEndFlip: function(){
        $(".ps-scrollbar-y-rail").click();
      }
        } );
        initEvents();
    },
    initEvents = function() {
            var $slides = config.$bookBlock.children();

            // add swipe events
            $slides.on( {
                'swipeleft' : function( event ) {
                    config.$bookBlock.bookblock( 'next' );
                    return false;
                },
                'swiperight' : function( event ) {
                    config.$bookBlock.bookblock( 'prev' );
                    return false;
                }
            } );

            // add keyboard events
            $( document ).keydown( function(e) {
                var keyCode = e.keyCode || e.which,
                    arrow = {
                        left : 37,
                        up : 38,
                        right : 39,
                        down : 40
                    };

                switch (keyCode) {
                    case arrow.left:
                        config.$bookBlock.bookblock( 'prev' );
                        break;
                    case arrow.right:
                        config.$bookBlock.bookblock( 'next' );
                        break;
                }
            } );
    };

    return { init : init };

})();

/* Menu */
$(".menu ul li").click(function(){
    var _index = $(this).index()+1;
    $('#bb-bookblock').bookblock('jump', _index);
})

/* Gallery Align */
_li = 1;
$("ul.gallery>li").each(function(){
    if((_li % 2)===1){
        $(this).addClass("gallery-left");
    }
    _li++;
});

/* Gallery Filters */
$(".workspace>.content .pagearea>div.bottom>ul.filters>li").click(function(){
    var _class = $.trim($(this).attr('class').replace('active',''));
    $(".workspace>.content .pagearea>div.bottom>ul.filters>li.active").removeClass('active');
    $(this).addClass('active');
    $(".workspace>.content .pagearea>div.bottom>ul.gallery>li").css('display','none');
    $(".workspace>.content .pagearea>div.bottom>ul.gallery>li." + _class).fadeIn();
    $(".ps-scrollbar-y").css('height','0');
    $(".gallery-left").removeClass("gallery-left");
    _li = 1;
    $("ul.gallery>li").each(function(){
        if($(this).css('display') !== 'none'){
            if((_li % 2)===1){
                $(this).addClass("gallery-left");
            }
            _li++;
        }
    });

  $(".ps-scrollbar-y-rail").click();
});

/* Init Flip Effect */
Page.init();

$(function() {
    /* Portfolio Hover*/
    $(' .da-thumbs > li ').each( function() { $(this).hoverdir(); } );
  
    /* Resume Accordion */
    $(".workspace>.content .pagearea.resume>div.bottom ul li").eq(0).find('h3').css('background-color','#636363');
    $(".workspace>.content .pagearea.resume>div.bottom ul li").eq(0).find('div').css('display','block');
    $(".workspace>.content .pagearea.resume>div.bottom ul li h3 span.pull-right i").addClass('fa-plus');
    $(".workspace>.content .pagearea.resume>div.bottom ul li").eq(0).find('h3 span.pull-right i').removeClass('fa-plus').addClass('fa-minus');
    $(".workspace>.content .pagearea.resume>div.bottom ul li h3").click(function(){
      $(".workspace>.content .pagearea.resume>div.bottom ul li").find('div').slideUp('fast',function(){
        $('.workspace>.content .pagearea>div.bottom').scrollTop(0);
        $(".ps-scrollbar-y").css("height",0);
        $(".ps-scrollbar-y-rail").click();
      });
      $(".workspace>.content .pagearea.resume>div.bottom ul li").find('h3').css('background-color','#999999');
      $(".workspace>.content .pagearea.resume>div.bottom ul li").find('h3 span.pull-right i').removeClass('fa-minus').addClass('fa-plus');
      if($(this).parent().children("div").css('display') === 'none'){
        $(this).css('background-color','#636363');
        $(this).find('span.pull-right i').removeClass('fa-plus').addClass('fa-minus');

        $(this).parent().children("div").slideDown('fast',function(){
          $('.workspace>.content .pagearea>div.bottom').scrollTop(0);
          $(".ps-scrollbar-y").css("height",0);
          $(".ps-scrollbar-y-rail").click();
        });
      }
    });
});
