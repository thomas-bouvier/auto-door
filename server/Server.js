var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');

var Door = require('./Door');
var door = new Door();

function handler (req, res) {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
        });
        res.end(data);
    })
}

console.log('Starting server...')
var clients = [];

io.on('connection', (socket) => {
    clients.push(socket);
    console.log("[user " + (clients.length - 1) + "] connected");
    socket.emit('info', 'Successfully connected');

    socket.on('door_action', () => {
        console.log("[user " + (clients.indexOf(socket)) + "] door_action");
        socket.emit('info', 'Door action');

        door.action();
    });

    socket.on('disconnect', () => {
        var i = clients.indexOf(socket);
        clients.splice(i, 1);
        console.log("[user " + i + "] disconnected");
        socket.emit('info', 'Disconnected');
    });
});

server.listen(8080);
