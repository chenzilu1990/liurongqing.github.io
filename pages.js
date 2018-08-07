const fs = require('fs')

let exp = /\d{4}-\d{2}-\d{2}-/i;
let arr = [];
let allFiles = [];

readFile('./tag',function(data){
    readFile('./_posts',function(data2){
        allFiles = data.concat(data2);
        writeFile(JSON.stringify(allFiles));
    })
})

function readFile(url, cb) {
    fs.readdir(url, function (err, files) {
        if (err) {
            console.error(err)
        } else {
            if (url.search('tag') > 0) {
                files.forEach(function (filename) {

                    // const isDir = fs.statSync(filename).isDirectory();
                    arr.push('/tag/' + filename + '/');
                });
            } else {
                files.forEach(function (filename) {

                    if (exp.test(filename)) {
                        arr.push(filename.replace(exp, '/').replace('.md', ''));
                    }
                });
            }

            cb && cb(arr);
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