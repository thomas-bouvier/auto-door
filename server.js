let http = require('http')

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-type': 'text/html; charset=utf-8'
    })
    response.end('Hello world!')
}).listen(8080)
