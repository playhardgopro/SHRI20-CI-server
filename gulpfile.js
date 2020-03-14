const gulp = require('gulp');
// const rename = require ('gulp-rename');
// const htmlhint = require("gulp-htmlhint");
// const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const clean = require('gulp-clean');
// const uncss = require('gulp-uncss');
// const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('scss', done => {
  gulp
    .src('./src/scss/style.scss')
    // .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true
        // outputStyle: 'compressed'
      })
    )
    .on('error', console.error.bind(console))
    // .pipe(sourcemaps.write('./'))
    // .pipe(concat('style.css'))
    //   .pipe(uncss({
    //     html: ['./build/*.html']
    // }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());

  done();
});

gulp.task('html', done => {
  gulp
    .src('./src/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./build'));
  done();
});

gulp.task('sync', done => {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    port: 3030
  });
  done();
});

gulp.task('reload', done => {
  browserSync.reload();
  done();
});

gulp.task('clean', () => {
  return gulp.src(['build/*'], { read: false }).pipe(clean());
});

gulp.task('server', () => {
  nodemon({
    script: './src/server/server.js',
    watch: ['./src/server/*.js'],
    ext: 'js'
  });
});

gulp.task('watchFile', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.series('scss', 'reload'));
  gulp.watch('./src/**/*.pug', gulp.series('html', 'reload'));
});

gulp.task('build', gulp.series('scss', 'html'));

gulp.task(
  'default',
  gulp.series('clean', 'build', gulp.parallel('watchFile', 'sync'))
);
