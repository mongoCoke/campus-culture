
var dots = document.getElementById('dots');
setInterval(function () {
    dots.classList.remove('animate');
    // 下一次运动需要等待所有小球都运动结束进行下一次运动
    // 父级具有class类名为animate下的子级可以进行运动
    // 通过控制animate类名控制子元素的运动
    setTimeout(function () {
        dots.classList.add('animate');
    }, 200);
    location.href = './html/index.html'
},3750);
