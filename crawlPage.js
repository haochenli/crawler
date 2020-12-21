var crawlerjs = require('crawler-js');
var HTMLParser = require('node-html-parser');

// execute crawl page with command like : node /Users/lihaochen/Downloads/js-crawler-master/crawler/home.js url
const fs = require('fs');

let rawdata = fs.readFileSync('./pageUrl.json');
let jsonData = JSON.parse(rawdata);
const vivoUrl = jsonData.vivo

var interval = 10000; // how much time should the delay between two iterations be (in milliseconds)?
;
console.log('start crawl page');

vivoUrl.forEach((url,index) => {
  setTimeout(function () {
    crawlerjs(crawOptions(url))
  }, index * interval);
  
})

// crawlerjs(crawOptions('https://www.gsmarena.com/vivo_y30_standard-10643.php'))

function crawOptions (urlParam) {
  return {
    interval: 1000,
    getSample: urlParam,
    get: urlParam,
    preview: 0,
    extractors: [
      {
        selector: '#specs-list',
        callback: function(err, html, url, response){
          // const title = HTMLParser.parse(html.children('title').toString());
          const data = {name: url.get}

          if(!err){
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
                data[th.innerHTML] = result
                // writeToResult(th.innerHTML + ': ' + result)
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
                  data[key] = result
                  // writeToResult(key + ': ' + result)
                })
              }
            
          });
          }
          // 一个型号的机器完成
          writeToResult(data)
          // console.log(data)

        }
      }
    ]
  }
}



function writeToResult (content) {
  let currentContent = {}
  fs.readFileSync('./result.json', (err, data) => {
      if (err) throw err;
      currentContent = JSON.parse(data);
  });

  currentContent[content.name] = content
  console.log(currentContent);
  const result = JSON.stringify(currentContent)
  fs.writeFileSync('./result.json', result, function (err) {
    if (err) throw err;
  });
}
 