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

    socket.auth = false;
    socket.on('auth', (json, callback) => {
        if (json.auth_key == config.auth.key) {
            token = generateToken();
            console.log("token = " + token);

            socket.auth = true;
            callback({
                status: 200,
                token: token,
            });
        }
        else {
            callback({
                status: 400,
                token: '',
                error: 'Wrong token !',
            });
        }
    });

    socket.on('door_state', (json, callback) => {
        if (json.token == token) {
            console.log("Door state triggered !");

            callback({
                status: 200,
                isOpen: door.isOpen(),
            });
        }
        else {
            callback({
                status: 400,
                error: 'Wrong token !',
            });
        }
    });

    socket.on('door_action', (json, callback) => {
        if (json.token == token) {
            console.log("Door action triggered !");
            socket.emit('door_action');

            door.action();

            if (door.isOpen()) {
                door.startWatchDog(function() {
                    callback({
                        status: 200,
                        isOpen: false,
                    })
                })
            }
            else {
                callback({
                    status: 200,
                    isOpen: true,
                });
            }
        }
        else {
            callback({
                status: 400,
                error: 'Wrong token !',
            });
        }
    });

    socket.on('disconnect', () => {
        console.log("Disconnected");
    });

    setTimeout(() => {
        if (!socket.auth) {
            console.log("Authentification failed (timeout) !");
            socket.disconnect();
        }
    }, 10000);
});

server.listen(8080);

function generateToken() {
    var date = (new Date()).valueOf().toString();
    var random = Math.random.toString();

    return crypto.createHash('sha1').update(date + random).digest('hex');
}
