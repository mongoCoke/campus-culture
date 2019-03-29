var input = document.getElementsByTagName('input')[0];
var oUl = document.getElementsByClassName('oUl')[0];

// 轮播图变量
var oImg = $('.content .sliderShow img');
// 默认中间展示索引值为0的这张图片
var curDisplay = 0;
// 将图片分散排列

// 获得图片个数
var len = oImg.length;
// 定时器
var timer;


function init(){
    bindEvent();
    initalCarousel();
    bind();
}
init()

input.oninput = function(){
    var value = this.value;    
    var oScript = document.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=callback';
    $('.btn-search').on('click',function(){
        location.href = 'https://www.baidu.com/s?&wd='+ value +''
    })
    document.body.appendChild(oScript);
}
function callback(data){
    var s =data.s;
    var str = '';
    s.forEach(function(ele,index){
        str += '<li><a href=https://www.baidu.com/s?&wd='+ ele +'>'+ ele +'</li>'        
    })
    oUl.innerHTML = str;
    oUl.style.display = 'block';
}

$(document).ready(function(){
   $('input').each(function(){
       var firstValue = this.value;
       $(this).focus(function(){
           if (this.value == firstValue){
               this.value = '';
           }
       });
       $(this).blur(function(){
           if (this.value == ''){
               this.value = firstValue;
           }           
           $('.oUl').css({'display':'none'})
       })
   })

})
function bindEvent(){
    $('.nav-box .nav ul li').on('mouseenter',function(){
        $('.change').removeClass('change');
        $(this).addClass('change')
    })
}


/*中间轮播图*/ 
//  initalCarousel() bind() play()

function initalCarousel() {
    // 获得中间图片
    console.log($('img'))
    var hLen = Math.floor(oImg.length / 2);
    // rNum,lNum分别是分散在中间图片左右左右两侧的图片索引
    var rNum, lNum;
    for (var i = 0; i < hLen; i++) {
        lNum = curDisplay - i - 1;
        // console.log(lNum)
        // 分别让分散在左右两侧的图片平移旋转
        oImg.eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        });
        rNum = curDisplay + i + 1;
        // 如果运动到最后一张 循环运动
        if (rNum > oImg.length - 1) {
            rNum -= oImg.length;
        }
        oImg.eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
        oImg.removeClass('active');
    }

    // 当前显示图片直接z轴向前移动  同时添加class名作为标记
    
    oImg.eq(curDisplay).css({
        transform: 'translateZ(300px)'
    }).addClass('active');

}
// 点击事件
function bind() {
    // 在每一张图片上绑定上点击事件
    oImg.on('click', function (e) {
        // 判断点击图片不是第一张显示图片 
        if (!$(this).hasClass('active')) {
            // 标记图片flag切换
            // 改变当前显示图片索引
            curDisplay = $(this).index();
            initalCarousel();
        }
        // 鼠标覆盖  清除自动轮播定时器
    }).hover(function () {
        clearInterval(timer);
        // 鼠标移走 继续轮播
    }, function () {
        play();
    });
}
// 自动播放
function play() {
    timer = setInterval(function () {
        if (curDisplay == len - 1) {
            curDisplay = 0;
        } else {
            curDisplay++;
        }
        initalCarousel();
    }, 2000);
}


// var root = window.player;
// var render =root.render;
// new render('../mock/data.json')
// function getData(url){
//     $.ajax({
//         type:'GET',
//         url:url,
//         success:function(data){
//             console.log(data)
//         }
//     })
// }
// getData("../mock/data.json");