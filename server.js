let http = require('http')
let fs = require('fs')

let io = require('socket.io')()

var server = http.createServer((request, response) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) throw err

        response.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        })
        response.end(data)
    })
})

io.listen(server)
io.on('connection', (socket) => {
    console.log('Successfully connected')
})

server.listen(8080)
