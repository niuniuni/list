var gulp = require('gulp');
var server = require('gulp-webserver'); //服务
var sequence = require('gulp-sequence'); //同步执行
var cleanCss = require('gulp-clean-css'); //压缩css
var autoprefixer = require('gulp-autoprefixer') //添加浏览器内核
var minjs = require('gulp-uglify') //压缩js
var babel = require('gulp-babel'); //编译es6
gulp.task('mincss', function() {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
})
gulp.task('minjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(minjs())
        .pipe(gulp.dest('dist/js'))
})
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8000,
            host: 'localhost',
            livereload: true, //实时更新
            middleware: function(req, res, next) { //拦截请求
                var data = '[{"name":"电影7","color":"rgb(85,184,178)","num":451,"bili":"16.78","jiaodu":60.424264979531074},{"name":"电影3","color":"rgb(149,104,121)","num":441,"bili":"16.41","jiaodu":59.084480833643475},{"name":"电影8","color":"rgb(16,159,88)","num":420,"bili":"15.63","jiaodu":56.27093412727949},{"name":"电影2","color":"rgb(119,194,243)","num":363,"bili":"13.51","jiaodu":48.63416449572013},{"name":"电影5","color":"rgb(95,173,66)","num":322,"bili":"11.98","jiaodu":43.141049497580944},{"name":"电影4","color":"rgb(225,137,255)","num":251,"bili":"9.34","jiaodu":33.628582061778935},{"name":"电影6","color":"rgb(42,73,226)","num":200,"bili":"7.44","jiaodu":26.79568291775214},{"name":"电影1","color":"rgb(8,37,51)","num":120,"bili":"4.47","jiaodu":16.077409750651285},{"name":"电影0","color":"rgb(47,100,99)","num":119,"bili":"4.43","jiaodu":15.943431336062524}]'
                if (/\/page/.test(req.url)) {
                    res.end(data)
                }
                next()
            }
        }))
})
gulp.task('default', function(aa) {
    sequence(['minjs', 'mincss'], 'webserver', aa)
})