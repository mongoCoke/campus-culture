$('.navigation a').on('click',function(){
    $('html,body').animate({
        scrollTop : $($(this).attr('href')).offset().top - 24 + 'px'
    },500);
    return false;
})