const fs = require('fs')

let exp = /\d{4}-\d{2}-\d{2}-/i;
let arr = [];

readFile('./_posts')

function readFile(url) {
    fs.readdir(url, function (err, files) {
        if (err) {
            console.error(err)
        } else {
            files.forEach(function (filename) {
                if (exp.test(filename)) {
                    arr.push(filename.replace(exp, '/').replace('.md', ''));
                }
            });
            writeFile(JSON.stringify(arr));
        }
    })
}

function writeFile(content) {
    fs.writeFile('page.txt', content, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('文件已经写入 page.txt 中');
        }
    })
}