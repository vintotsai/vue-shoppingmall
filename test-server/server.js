const http = require('http')
const url = require('url')
const util = require('util')
const fs = require('fs')

const port = 3110

let server = http.createServer((req, res) => {

  // res.statusCode = 200;
  // res.writeHead('Content-Type','text/plain;chartset=uft-8')

  // res.writeHead(302, {
  //   'Content-Type': 'text/plain/totsai'
  // });


  // res.setHeader('Content-Type', 'text/html');
  // res.setHeader('X-Foo', 'bar');
  // res.writeHead(200, {
  //   'Content-Type': 'text/plain/writeHead'
  // });


  const pathname = url.parse(req.url).pathname;
  fs.readFile(pathname.substring(1), function (err, data) {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())
    }
    res.end()
  })

  // util.inspect是调试时用的
  // url.parse只会输出[Object]
  //   res.end(`[nodejs]Hello from server.
  // ${util.inspect(url.parse('http://localhost:3110/aaa.html?userid=1&goodID=2'))}
  // `)

  //   res.end(`[nodejs]Hello from server.
  // ${util.inspect(url.parse(req.url))}
  // `)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Server at http://localhost:${port}`)
})
