var crawlerjs = require('crawler-js');
var HTMLParser = require('node-html-parser');

const url = process.argv[2];
// execute crawl page with command like : node /Users/lihaochen/Downloads/js-crawler-master/crawler/home.js url

var worlds = {
  interval: 1000,
  getSample: url,
  get: url,
  preview: 0,
  extractors: [
    {
      selector: '#specs-list',
      callback: function(err, html, url, response){
        // const title = HTMLParser.parse(html.children('title').toString());
        console.log('----------------------------------------------')
        console.log('crawler target is: ' + url.get)
        if(!err){
        data = {};
        const root = HTMLParser.parse(html.children('table').toString());
        root.childNodes.forEach(table => {
            let trs = table.querySelectorAll('tr')
            if(trs.length === 1){
              let tr = 0
              tr = trs[0]
              const th = tr.querySelector('.ttl')
              const content = tr.querySelector('.nfo')
              let result = content.innerHTML
              if(result.indexOf('href=') > -1){
                  result = content.querySelector('a').innerHTML
              }
              console.log(th.innerHTML + ': ' + result);
            } else {
              trs.forEach(tr => {
                let td = tr.querySelector('.ttl')
                let key = td.querySelector('a')
                if(key?.innerHTML) {
                  key = key.innerHTML
                } else {
                  // actually do nothing 
                  console.log(key)
                }
                const content = tr.querySelector('.nfo')
                let result = content.innerHTML
                if(result.indexOf('href=') > -1){
                    result = content.querySelector('a').innerHTML
                }
                console.log(key + ': ' + result);
              })
            }
          
        });
        }
        console.log('----------------------------------------------')
      }
    }
  ]
}
 
crawlerjs(worlds);