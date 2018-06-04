var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var path = require('path')

gulp.task('default', function (cb) {
    var buffers = [];
    gulp
        .src(['_posts/*.md', 'index.md'])
        .on('data', function (file) {
            buffers.push(file.contents);
        })
        .on('end', function () {
            var arr = Buffer.concat(buffers).toString('utf-8').split('');
            var text = [...new Set(arr)].join('');
            minifyFont(text, cb)
        });
})

function minifyFont(text, cb) {

    gulp
        .src('assets/fonts/tmp/*.ttf')
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('assets/fonts/'))
        .on('end', cb);
}
