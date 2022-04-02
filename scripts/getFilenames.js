var fs = require('fs')
var files = fs.readdirSync('./src/sprites-copy/')

files.forEach((file) => {
  // console.log(`import img${file.replace('.png','')} from './${file}'`);
  // console.log(`'${file.replace('.png','')}': img${file.replace('.png','')},`);
})
