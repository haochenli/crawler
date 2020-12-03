var crawlerjs = require('crawler-js');
var HTMLParser = require('node-html-parser');
 
var worlds = {
  interval: 1000,
  getSample: 'https://www.gsmarena.com/apple_iphone_12_pro_max-10237.php',
  get: 'https://www.gsmarena.com/apple_iphone_12_pro_max-10237.php',
  preview: 0,
  extractors: [
    {
      selector: '#specs-list',
      callback: function(err, html, url, response){
        // console.log('Crawled url:');
        // console.log(url);
        // console.log(response); // If you need see more details about request
        if(!err){
          data = {};
        const root = HTMLParser.parse(html.children('table').toString());
        root.childNodes.forEach(table => {
            const tr = table.querySelector('tr')
            const th = tr.querySelector('th')
            const content = tr.querySelector('.nfo')
            let result = content.innerHTML
            if(result.indexOf('href=') > -1){
                result = content.querySelector('a').innerHTML
            }
            console.log(th.innerHTML + ': ' + result);
        });
        // const th = root.querySelectorAll('tr')
        // th.forEach(item => {
        //     const content = item.innerText
        //     console.log(content)
        // })
        //   data.world = html.children('table').toString()
        // console.log( data.world)
         
        
        //   console.log(data);
        }
      }
    }
  ]
}
 
crawlerjs(worlds);