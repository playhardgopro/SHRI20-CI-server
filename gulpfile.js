var gulp = require ('gulp');
// var rename = require ('gulp-rename');
// var htmlhint = require("gulp-htmlhint");
// var concat = require('gulp-concat');
var sass = require ('gulp-sass');
var pug = require ('gulp-pug');
var clean = require('gulp-clean');
// var uncss = require('gulp-uncss');
// var sourcemaps = require('gulp-sourcemaps');
var browserSync = require ('browser-sync').create();

gulp.task('scss',function(done) {
  gulp.src('./src/scss/style.scss')
  // .pipe(sourcemaps.init())
  .pipe(sass({
    errorLogToConsole: true,
    // outputStyle: 'compressed'
  }))
    .on('error', console.error.bind(console))
    // .pipe(sourcemaps.write('./'))
    // .pipe(concat('style.css'))
  //   .pipe(uncss({
  //     html: ['./build/*.html']
  // }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
  
  done();
})

gulp.task('html', function (done) {
  gulp.src("./src/*.pug")
  .pipe(
    pug({
      pretty: true
    })
  )
  .pipe(gulp.dest('./build'))
  done()
});

gulp.task('sync',function(done) {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    port: 3000
    });
    done();
})

gulp.task('reload',function browserReload(done) {
  browserSync.reload();
  done()
})

gulp.task('clean', function() {
  return gulp.src(['build/*'], {read: false})
    .pipe(clean());
});

gulp.task('watchFile', function() {
  gulp.watch("./src/scss/**/*.scss", gulp.series('scss', 'reload'));
  gulp.watch("./src/**/*.pug", gulp.series('html', 'reload'));
  
})

gulp.task('build', gulp.series('scss', 'html'))

gulp.task('default', gulp.series('clean','build', gulp.parallel('watchFile', 'sync')));