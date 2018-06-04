var Fontmin = require('fontmin');

var fontmin = new Fontmin()
    .src('*.otf')
    .use(Fontmin.otf2ttf())
    .dest('./')