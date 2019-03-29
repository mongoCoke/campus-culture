var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");
//压缩html
var imagemin = require("gulp-imagemin");
//压缩图片
var uglify = require("gulp-uglify");
//压缩js
var strip = require("gulp-strip-debug");
//去掉调试语句
var concat = require("gulp-concat");
//拼接js
var less = require("gulp-less");
//把less转换成css
var postcss = require("gulp-postcss");

var autoprefixer = require("autoprefixer");
//添加css兼容前缀
var cssnano = require("cssnano");
//压缩css代码
var devMode = process.env.NODE_ENV == "develoment"
//develoment 开发环境  producation 生产环境
var connect = require("gulp-connect");
//开启服务器

//gulp的四个API
// gulp.task()//任务
// gulp.src()//读文件
// gulp.dest()//写文件
// gulp.watch()//监听

var folder = {
    src: "./src/", //开发目录文件夹
    dist: "./dist/" //压缩打包后目录文件夹
}
gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlclean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images", function () {
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
    if (!devMode) {
        page.pipe(strip())
        page.pipe(uglify())
    }
    page.pipe(concat("main.js"))
    page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server", function () {
    connect.server({
        port: "8080",//改端口号
        livereload: true//开启浏览器自动刷新页面
    });
})

gulp.task("default", ["html", "images", "js", "css", "watch", "server"])