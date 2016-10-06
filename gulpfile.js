var gulp          =     require('gulp');
var babel         =     require('gulp-babel');
var sass          =     require('gulp-sass');
var sourcemaps    =     require('gulp-sourcemaps');

// Assets source files path
var sassSrc       =     'src/sass/**/*.scss';
var jsSrc         =     'src/js/**/*.js';

gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('transpile', function() {
  return gulp.src(jsSrc)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function() {
  gulp.watch(jsSrc, ['transpile']);
  gulp.watch(sassSrc, ['sass']);
});

gulp.task('default', ['watch'], function () {
  gulp.start('transpile', 'sass');
});
