var gulp = require('gulp');
var beautify = require('gulp-beautify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(beautify({
    	indentSize: 4,
	    preserveNewlines: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('default', [
    'scripts'
]);