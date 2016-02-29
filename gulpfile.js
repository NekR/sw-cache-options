const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('build:node', () => {
  return gulp.src('src/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('build', gulp.series('build:node'));

gulp.task('watch:node', gulp.series('build:node', () => {
  gulp.watch(['src/**.js'], gulp.series('build:node'));
}));

gulp.task('clean', () => {
  return del(['lib/*.js']);
});

