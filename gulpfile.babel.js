import gulp       from 'gulp';
import babel      from 'gulp-babel';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

// Assets source files path
const sassSrc = 'src/sass/**/*.scss';
const jsSrc = 'src/js/**/*.js';

gulp.task('sass', () => {
  return gulp.src(sassSrc)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('transpile', () => {
  return gulp.src(jsSrc)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', () => {
  gulp.watch(jsSrc, ['transpile']);
  gulp.watch(sassSrc, ['sass']);
});

gulp.task('default', ['watch', 'transpile', 'sass']);
