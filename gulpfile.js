'use strict';
var gulp 		   = require('gulp'),
	browserSync  = require('browser-sync').create(),
	sass         = require('gulp-sass'),
	wiredep 	   = require('wiredep').stream,
	useref 		   = require('gulp-useref'),
	gulpif 		   = require('gulp-if'),
	uglify 		   = require('gulp-uglify'),
	cleanCss 	   = require('gulp-clean-css'),
	clean 		   = require('gulp-clean'),
	tinypng		   = require('gulp-tinypng');

//==================CLEAN==================
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

//=============TinyPNG compressing=============
gulp.task('tinypng', function () {
	gulp.src('app/assets/img/**/*.{png,jpg,jpeg}')
		.pipe(tinypng('dqKvFwiTu261SOxX2G8ccniOW2heblor'))
		.pipe(gulp.dest('dist/assets/img'));
});

//================BOWER================
gulp.task('bower', function () {
	gulp.src('./app/*.html')
		.pipe(wiredep({
			directory : 'app/bower_components'
		}))
		.pipe(gulp.dest('./app'));
});

//=========Перемешение наших локальных файлов в папку dist ===== //
gulp.task('fonts', function() {
	return gulp.src('./app/assets/fonts/**/*.*')
		.pipe(gulp.dest('./dist/assets/fonts'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./app"
	});

	gulp.watch('bower.json', ['bower']);
	gulp.watch("app/scss/*.scss", ['sass']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

//==================BUILD==================
gulp.task('build', ['clean', 'tinypng'], function () {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cleanCss()))
		.pipe(gulp.dest('dist'));

});
