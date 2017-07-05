var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');
var crypto = require('crypto');

var config = require('./config');

var Door = require('./door');
var door = new Door();

function handler(req, res) {
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

var token = '';

io.on('connection', (socket) => {
    console.log("Connected");
    socket.emit('connected');

    socket.on('auth', (json, callback) => {
        if (json.auth_key == config.auth.key) {
            token = generateToken();
            console.log("token = " + token);

            callback({
                status: 200,
                token: token,
            });
        }
        else {
            callback({
                status: 400,
                token: '',
                error: config.auth.errors.wrong_auth,
            });
        }
    });

    socket.on('door_action', () => {
        console.log("Door action triggered!");
        socket.emit('door_action');

        door.action();
    });

    socket.on('disconnect', () => {
        socket.emit('disconnected');
    });
});

server.listen(8080);

function generateToken() {
    var date = (new Date()).valueOf().toString();
    var random = Math.random.toString();

    return crypto.createHash('sha1').update(date + random).digest('hex');
}
