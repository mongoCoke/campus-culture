(function($,root){
    function renderImg(src){
        var img =new Image();
        img.onload = function(){
            $('.corner-img img').attr('src',src);
        }
    }
    function renderInfo(data){
        var str = ' <div class="corner-img">\
        <img src="'+ data.image +'" alt="">\
    </div>\
    <div class="corner-content">\
        <h3>'+ data.name +'</h3>\
        <p>'+ data.content +'</p>\
    </div>';
        $('.show').html(str);
    }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data)
    };
})(window.jQuery,window.player || (window.player = {}))