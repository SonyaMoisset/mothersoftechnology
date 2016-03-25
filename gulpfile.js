var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cssnano = require('gulp-cssnano');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('clean', function(){
  return del(['build']);
});

gulp.task('build', ['clean'], function(){
  gulp.start('htmlBuild');
  gulp.start('cssBuild');
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['*.jade'], ['htmlBuild']);
  gulp.watch(['styl/*.styl'], ['cssBuild']);
});

gulp.task('htmlBuild', ['jade'], function() {
  browserSync.reload();
});

gulp.task('cssBuild', ['stylus'], function() {
  browserSync.reload();
});

gulp.task('jade', function () {
  return gulp.src('*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('stylus', function () {
  return gulp.src('styl/*.styl')
    .pipe(stylus())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'));
});
