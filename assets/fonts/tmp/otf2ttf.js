// 有问题、生成文件更大了，不可用
var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('./*.otf')
    .use(Fontmin.otf2ttf())
    .dest('fonts');

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
    console.log(files[0]);
    // => { contents: <Buffer 00 01 00 ...> }
});