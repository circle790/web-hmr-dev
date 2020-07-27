const gulp = require("gulp");
const connect = require("gulp-connect");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const fileinclude = require('gulp-file-include');
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("autoprefixer");
const postCss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");

// html文件处理
gulp.task("html", (done) => {
  gulp
    .src(["./src/**/*.html", "!./src/include/*.html"])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist"));
  done();
});

// css文件处理
gulp.task("scss", (done) => {
  gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(postCss([autoprefixer({ overrideBrowserslist: ["> 0.15% in CN"] })]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(cleanCss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/css/min"));
  done();
});

// js文件处理
gulp.task("js", (done) => {
  gulp
    .src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("./dist/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write())
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/js/min"));
  done();
});

// 图片处理
gulp.task("img", (done) => {
  gulp
    .src("./src/img/**/*")
    .pipe(
      imagemin({
        progressive: true,
        use: [pngquant()], //使用pngquant来压缩png图片
      })
    )
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/img"));
  done();
});

// 启动
gulp.task("connect", (done) => {
  connect.server({
    root: "dist",
    livereload: true,
    host: "localhost",
    port: 9000,
    middleware: (connect, opt) => {
      return [];
    },
  });
  done();
});

// 监控
gulp.task("watch", (done) => {
  gulp.watch(["./src/**/*.html"], gulp.series("html"));
  gulp.watch(["./src/js/**/*.js"], gulp.series("js"));
  gulp.watch(["./src/scss/**/*.scss"], gulp.series("scss"));
  gulp.watch(["./src/img/**/*.*"], gulp.series("img"));
  done();
});

// 清空static
gulp.task("clean", (done) => {
  gulp.src(["./dist/static/**/*"], { read: false }).pipe(clean());
  done();
});

// 移动static
gulp.task("move", (done) => {
  gulp.src(["./static/**/*"]).pipe(gulp.dest("./dist/static"));
  done();
});

// 默认任务
gulp.task(
  "default",
  gulp.series("move", "html", "img", "js", "scss", "connect", "watch")
);
