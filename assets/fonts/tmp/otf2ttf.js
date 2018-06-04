// var Fontmin = require('fontmin');
// var path = require('path');


// var fontmin = new Fontmin()
//     // .src(path.resolve('*.otf'))
//     .src('./ddd/*.otf')
//     .use(Fontmin.otf2ttf())
//     .dest('./')


var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('./*.otf')
    .use(Fontmin.otf2ttf());
