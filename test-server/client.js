// const https = require('https')
// https.get('https://github.com/vincentotsai',(data)=>{
//   console.log(data)
// })

const http = require('http')
const util = require('util')

http.get('http://www.imooc.com/u/card', (response) => {
  let rawData = ''
  response.on('data', function (chunk) {
    rawData += chunk;
  })
  response.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
      console.log('util:',util.inspect(parsedData))
    } catch (e) {
      console.error(e.message);
    }
  });
})
