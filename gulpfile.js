var gulp = require('gulp');
var minifyJs = require('gulp-minify');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('copyJs', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('app/dist/'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('app/dist/js'))

  gulp.src([
      'node_modules/popper.js/dist/umd/*'
    ])
    .pipe(gulp.dest('app/dist/js/popper/'))

  gulp.src([
      'app/src/js/**/*'
    ])
    .pipe(minifyJs({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest('app/dist/js/'))
})

gulp.task('copyCss', function() {
  gulp.src([
      'app/src/css/**/*.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/dist/css/'))

  gulp.src([
      'app/src/sass/**/*.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/dist/css/'))
})

// Default task
gulp.task('default', ['copyJs', 'copyCss']);
