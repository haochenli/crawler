const { execSync } = require('child_process');
let stdoutBrand = execSync('node ./brand.js',  {stdio: 'inherit'});
console.log(stdoutBrand)
let stdoutPage = execSync('node ./crawlPage.js',  {stdio: 'inherit'});