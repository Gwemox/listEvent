var gulp = require('gulp');

gulp.task('copy', function() {
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
})

// Default task
gulp.task('default', ['copy']);
