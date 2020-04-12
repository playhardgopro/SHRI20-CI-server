const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()

gulp.task('scss', (done) => {
  gulp
    .src('./server/src/scss/style.scss')
    .pipe(
      sass({
        errorLogToConsole: true,
        // outputStyle: 'compressed'
      })
    )
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./server/static'))
    .pipe(browserSync.stream())

  done()
})

gulp.task('html', (done) => {
  gulp
    .src('./server/src/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('./server/static'))
  done()
})

gulp.task('sync', (done) => {
  browserSync.init({
    server: {
      baseDir: './server/static',
    },
    port: 3030,
  })
  done()
})

gulp.task('reload', (done) => {
  browserSync.reload()
  done()
})

gulp.task('clean', () => {
  return gulp.src(['/server/static/*'], { read: false }).pipe(clean())
})

gulp.task('server', () => {
  nodemon({
    script: './server/server.js',
    watch: ['./server/**/*.js'],
    ext: 'js',
  })
})

gulp.task('watchFile', () => {
  gulp.watch('./server/src/scss/**/*.scss', gulp.series('scss', 'reload'))
  gulp.watch('./server/src/**/*.pug', gulp.series('html', 'reload'))
})

gulp.task('build', gulp.series('scss', 'html'))

gulp.task('default', gulp.series('clean', 'build', gulp.parallel('watchFile', 'sync')))
