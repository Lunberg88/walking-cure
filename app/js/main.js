$(document).ready(function() {

    /* Slider */
    $('.main-slider').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        lazyLoad: 'progressive'
    });


    /* Timer */
    console.log( "start timer" );
    var endTimerTime = $('.timer').attr('data-end-timer');
    var messageAfterTimerStop = $('.timer').attr('data-message');
    var end = new Date(endTimerTime);

    var _minute = 1000 * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    setInterval(function(){
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {
            $('#timer').text(messageAfterTimerStop);
            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);

        if (days < 10) {
            var days = '0' + days;
        }

        if (hours < 10) {
            var hours = '0' + hours;
        }

        if (minutes < 10) {
            var minutes = '0' + minutes;
        }

        $('#timer').text( days + ':' + hours + ':' + minutes);

    }, 1000);


    /* Burger */
    $('.burger').on('click', function() {
      $('.menu__wrap').stop(true, true).slideToggle(300);
    });


    /* Slide account content */
    $('.fa-angle-down').on('click', function() {
        $(this).toggleClass('deg180');
        $('.user-content__main').stop(true, true).slideToggle(300);
    });

    /*
        $('.fa-angle-down').on('click', function() {
            $(this).toggleClass('deg180');
            $('.user-content__main').stop(true, true).slideToggle(300);
        });
     */

    /* Slide aside menu */
    $('.aside-burger').on('click', function() {

        var side_bar = $('.sidebar-menu');

        side_bar
            .stop(true, true)
            .slideToggle(300)
            .toggleClass('open');

        if(side_bar.hasClass('open')) {
            $('.aside-burger').css('border-bottom-width', '0');
            $(this).find('i')
                .removeClass('fa-bars')
                .addClass('fa-times');
        } else {
            $('.aside-burger').css('border-bottom-width', '1px');
            $(this).find('i')
                .removeClass('fa-times')
                .addClass('fa-bars');
        }

    });


    /* Check comments count */
    if($('.comment-block').length < 1) {
        $(this).css('border-bottom', 'none');
    }

    /* Auto block height */
    $('.s1 .video').height($('.photo-block').height() - 150);

    /*===NO DRAG ELEMENT======================================================*/
    $('img, a').on('dragstart', function(event) { event.preventDefault(); });
    /*========================================================================*/


    /*====INPUT MASK==================================*/
    //$('input[type=tel]').mask('+375 (99) 999-9999');
    /*================================================*/

    
    /* Charts */
    function pieSlicer(utilslider, circumference, circle) {
        var percentValue = (utilslider.value / 100) * circumference;
        circle.style.strokeDasharray = percentValue + " " + circumference;
    }

    var utilslider = document.getElementById("utilslider"),
        circle = document.getElementById("pie"),
        radius = parseInt(circle.getAttribute('r'), 10),
        circumference = 2 * radius * Math.PI;

    var utilslider2 = document.getElementById("utilslider2"),
        circle2 = document.getElementById("pie2"),
        radius2 = parseInt(circle2.getAttribute('r'), 10),
        circumference2 = 2 * radius2 * Math.PI;

    $('#point_count').text(utilslider2.value);
    $('#percent_count').text(utilslider.value);

    pieSlicer(utilslider, circumference, circle);
    pieSlicer(utilslider2, circumference2, circle2);



}); // <-- END READY
