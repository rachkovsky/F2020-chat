const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const minify = require('gulp-minify');
 

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

function js() {
    return gulp.src('./src/js/*')
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
}

function images() {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./dist/img'));
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
    gulp.watch('src/js/**/*.js', js);

}
exports.fonts = fonts;
exports.images = images;
exports.watch = watch;
