var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');	

// =====================================
// 		HTML Task
// =====================================
gulp.task('html', function() {
	gulp.src('./*.html')
        .pipe(plumber())
		.pipe(reload({stream:true}));
});


// =====================================
// 		Styles Task
// =====================================
gulp.task('styles', function () {
  gulp.src(['./styles/*.css', 'singerjs.css'])
    .pipe(plumber())
    .pipe(reload({stream:true}));
});



// =====================================
// 		Scripts Task
// =====================================
gulp.task('scripts', function() {
	gulp.src('scripts/script.js')
		.pipe(plumber())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/'))
		.pipe(reload({stream:true}));
	gulp.src("singer.js")
		.pipe(plumber())
		.pipe(reload({stream:true}));
});


// =====================================
// 		Browser Sync Task
// =====================================
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


// =====================================
// 		Watch Task
// =====================================
gulp.task('watch', function() {
    gulp.watch('./*.html', ['html']);
    gulp.watch(['./styles/*.css', 'singerjs.css'], ['styles']);
    gulp.watch(['scripts/script.js', "singer.js"], ['scripts']);
});


gulp.task('default', ['html', 'styles', 'scripts', 'browser-sync', 'watch']);


