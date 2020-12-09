const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
 

const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        // .pipe(cssnano())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function templates() {
    return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./dist",
           index: "index.html",
        }
    });
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/pug/**/*.pug', templates);

}

exports.watch = watch;
