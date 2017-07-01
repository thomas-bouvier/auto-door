var server = require('http').createServer(handler)
var io = require('socket.io')(server)
var fs = require('fs')

function handler (req, res) {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        })
        res.end(data)
    })
}

io.on('connection', (socket) => {
    socket.emit('info', 'Successfully connected')
    console.log('connected')
})

server.listen(8080)
