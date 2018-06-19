目录结构
gulpfile.js # gulp 主文件  
gulp  
-- config.js # 全局参数配置文件
-- tasks # 子任务目录
-- -- html.js # 压缩 html
-- -- css.js # 编译 scss 压缩 css
-- -- ...
src # 源文件  
dist # 生成文件  
package.json # npm 包配置文件  
node_modules # npm 包模块
插件统一管理
// 插件引入，统一在gulpfile.js中操作 gulp-load-plugins会自动加载package.json中所有模块
var plugins = require("gulp-load-plugins")();

var config = require("./gulp/config")();

// 读取所有子任务文件
gulpTaskList = require("fs").readdirSync("./gulp/tasks/");

// 运行子任务并传入插件库参数与全局参数
gulpTaskList.forEach(function (taskfile) {  
    require("./gulp/tasks/" + taskfile)(gulp, plugins, config);
});
参数全局配置
module.exports = function () {
    return {
        js: {
            // 源文件路径、生成文件路径、压缩参数等。
          source: ".",
          dest: "",
          options: {
             // 参数
          }
        },
        css: {
            ...
        },
        image: {
            ...
        },
        html: {
            ...
        }
    }
};
子任务
html gulp-htmlmin
module.exports = function(gulp,plugin,config){  
gulp.task("htmlmin",function () {
// 参数可在全局配置文件config中设置
return gulp.src("./src/*.html") // 相对gulpfile.js文件路径的html
  .pipe(plugin.htmlmin({
       // 参数都可以写在参数全局配置的config.js中
      collapseWhitespace: true, // 去空格
      removeComments: true, // 去注释
      collapseBooleanAttributes: true, // 去属性布尔值，如checked="true"变成checked之类的
      removeEmptyAttributes: true, // 去属性值为空的值，如id="" class=""，checked这类属性除外
      removeScriptTypeAttributes: true, // 去<script>内的type属性及值
      removeStyleLinkTypeAttributes: true, //去<link>内的type属性及值
      minifyJS: true, // 压缩页面js
      minifyCSS: true // 压缩页面css
}))
  .pipe(gulp.dest("./dist")); // 相对gulpfile.js文件路径
});
};
css gulp-sass
module.exports = function(gulp,plugin,config){  
gulp.task("sass", function () {
// 参数可在全局配置文件config中设置
return gulp.src(config.css.source)
  .pipe(plugin.sass({
   // 参数都可以写在参数全局配置的config.js中
    // nested结束}不换行默认 | expanded结束}换行[常用格式] | compact每个样式一行 | compressed 全压缩
    outputStyle:"compressed", 
  }).on("error", plugin.sass.logError)) // plugin.sass.sync().on 同步进行
  .pipe(gulp.dest(config.css.dest))
});

// 如果需要 Source Maps 需要使用以下库，在编译前调用 sourcemaps.init()，
// 编译后调用 sourcemaps.write("./maps")
var sourcemaps = require("gulp-sourcemaps");
}
image gulp-imagemin
module.exports = function(gulp,plugin,config){  
  gulp.task("image", function () {
        return gulp.src(config.image.source)
            .pipe(plugin.imagemin())
            .pipe(gulp.dest(config.image.dest));
    });
}
js gulp-uglifyjs
gulp.task("js", function () {  
   return gulp.src(config.js.source)
     .pipe(plugin.uglifyjs(config.js.name,config.js.options))
     .pipe(gulp.dest(config.js.dest))
 });
js gulp-closure-compiler
module.exports = function(gulp,plugin,config){  

// 简单的优化，经典缩减
gulp.task("js", function () {

// 参数可在全局配置文件config中设置
   return gulp.src("./src/js/**/*.js")
       .pipe(plugin.closureCompiler({
         fileName: "build.js",
         compilerFlags: {
           // WHITESPACE_ONLY：去空格、换行、注释
           // SIMPLE_OPTIMIZATIONS：在WHITESPACE_ONLY在基础上，对局部变量进行缩短，也是主流压缩工具使用的压缩方式：如Uglify2,比较安全。
           // ADVANCED_OPTIMIZATIONS 改变原有代码结构，对代码分析、重写、破坏，但是把代码压缩做到了极致，极大的减少了代码量
           compilation_level: "ADVANCED_OPTIMIZATIONS", // 高级有损压缩
           // QUIET 安静的，不报错
           // DEFAULT 默认
           // VERBOSE 错误详情，报错并中断
           warning_level: "VERBOSE"
         }
       }))
       .pipe(gulp.dest("./dest/js"))
  .pipe(gulp.dest(config.css.dest))
});
}
font fontmin
module.exports = function (gulp, plugin, config) {  
    gulp.task("font", function (cb) {
        var buffers = [];
        function minifyFont(text, cb) {
            gulp
                .src(config.font.source)
                .pipe(plugin.fontmin({
                    text: text
                }))
                .pipe(gulp.dest(config.font.dest))
                .on("end", cb);
        }

        gulp
            .src(config.font.htmlPath)
            .on("data", function (file) {
                buffers.push(file.contents);
            })
            .on("end", function () {
                var text = Buffer.concat(buffers).toString("utf-8");
                minifyFont(text, cb);
            })
    });
};
开发与发布
// 开发
gulp.task("default",["sass","js","sass:watch","js:watch"]);

// 发布
gulp.task("release",["html","sass","js","image","font"]);