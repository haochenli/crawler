var crawlerjs = require('crawler-js');
var HTMLParser = require('node-html-parser');
const fs = require('fs');

var worlds = {
  interval: 1000,
  getSample: 'https://www.gsmarena.com/vivo-phones-98.php',
  get: 'https://www.gsmarena.com/vivo-phones-98.php',
  preview: 0,
  extractors: [
    {
      selector: '.makers',
      callback: function(err, html, url, response){
        const result = {
          vivo: []
        }
        // const title = HTMLParser.parse(html.children('title').toString());
        if(!err){
          const root = HTMLParser.parse(html);
          const lis = root.querySelectorAll('li')
          lis.forEach(li => {
            const a = li.querySelector('a')
            const url = a.getAttribute('href')
            result.vivo.push('https://www.gsmarena.com/' + url)
          })
        }
        let data = JSON.stringify(result);
        fs.writeFileSync('./pageUrl.json', data);
      }
    }
  ]
}
 
crawlerjs(worlds);