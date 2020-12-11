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
        // root.childNodes.forEach(table => {
        //     let trs = table.querySelectorAll('tr')
        //     if(trs.length === 1){
        //       let tr = 0
        //       tr = trs[0]
        //       const th = tr.querySelector('.ttl')
        //       const content = tr.querySelector('.nfo')
        //       let result = content.innerHTML
        //       if(result.indexOf('href=') > -1){
        //           result = content.querySelector('a').innerHTML
        //       }
        //       console.log(th.innerHTML + ': ' + result);
        //     } else {
        //       trs.forEach(tr => {
        //         let td = tr.querySelector('.ttl')
        //         let key = td.querySelector('a')
        //         if(key?.innerHTML) {
        //           key = key.innerHTML
        //         } else {
        //           // actually do nothing 
        //           console.log(key)
        //         }
        //         const content = tr.querySelector('.nfo')
        //         let result = content.innerHTML
        //         if(result.indexOf('href=') > -1){
        //             result = content.querySelector('a').innerHTML
        //         }
        //         console.log(key + ': ' + result);
        //       })
        //     }
          
        // });
        }
        let data = JSON.stringify(result);
        fs.writeFileSync('./pageUrl.json', data);
      }
    }
  ]
}
 
crawlerjs(worlds);