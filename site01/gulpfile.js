var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var ftp = require('gulp-ftp');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });

    //следим за изменениями файлов
    gulp.watch("src/assets/sass/**/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/assets/sass/**/*.sass")
        //.pipe(sass().on('error',sass.logError))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCSS('main.css'))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('ftp', function () {
    return gulp.src('src/**')
        .pipe(ftp({
            host: 'host',
            user: 'user',
            pass: 'Bo3n]W_8*yEf',
            remotePath: 'dev'
        }))
        .pipe(gutil.noop());
});

gulp.task('default', ['serve']);