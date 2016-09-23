var gulp          =     require('gulp');
var babel         =     require('gulp-babel');
var sass          =     require('gulp-sass');
var sourcemaps    =     require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(''))
});

gulp.task('transpile', function() {
  return gulp.src('js/src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('js/dist'));
});


gulp.task('watch', function() {
  gulp.watch('js/src/**/*.js', ['transpile']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
