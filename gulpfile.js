"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const mergeMedia = require('gulp-merge-media-queries');
const plumber = require('gulp-plumber');

// BrowserSync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./"
      },
      port: 3000
    });
    done();
  }
  
  // BrowserSync reload
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

// CSS task
function css() {
return gulp
    // Find the file
    .src('developer/scss/**/style.scss')
    .pipe(plumber())
    .pipe(sass({
    outputStyle: "expanded",
    includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
    }))
    .pipe(mergeMedia({
    log: true
    }))
    .pipe(gulp.dest("./assets/css"))
    .pipe(rename({
    suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch("developer/scss/**/*", css);
    gulp.watch("./**/*{.html,.php}", browserSyncReload);
}
  
// Define complex tasks
const build = gulp.series(gulp.parallel(css));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

exports.css = css;
exports.watch = watch;