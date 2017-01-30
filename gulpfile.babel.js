import gulp       from 'gulp';
import babel      from 'gulp-babel';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

// const parsed = JSON.parse(fs.readFileSync('./package.json'));

// Assets source files path
const paths = {
  sass: 'src/sass/**/*.scss',
  script: 'src/js/**/*.js'
};

gulp.task('sass', () => {
  return gulp.src(paths.sass)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('transpile', () => {
  return gulp.src(paths.script)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', () => {
  gulp.watch(paths.script, ['transpile']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['watch', 'transpile', 'sass']);
