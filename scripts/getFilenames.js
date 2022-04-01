var fs = require('fs');
var files = fs.readdirSync('./src/sprites-copy/');

console.log('files', files);
files.forEach(file => {
    // console.log(`import img${file.replace('.png','')} from './${file}'`);

    // console.log(`img${file.replace('.png','')},`);
    // console.log(`img${file.replace('.png','')},`);
    console.log(`'${file.replace('.png','')}': img${file.replace('.png','')},`);


})