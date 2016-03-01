const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const rename = require('gulp-rename');

gulp.task('build:node', () => {
  return gulp.src('src/**')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('build:browser', () => {
  return gulp.src('lib/index.js')
    .pipe(rename('sw-options-cache.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('build:node', 'build:browser'));

gulp.task('watch:node', gulp.series('build:node', () => {
  gulp.watch(['src/**.js'], gulp.series('build:node'));
}));

gulp.task('clean', () => {
  return del(['lib/*.js']);
});

