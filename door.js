var rpio = require('rpio')
var sleep = require('sleep')

var config = require('./config')

function Door() {
    rpio.open(config.pin.action, rpio.OUTPUT, rpio.HIGH)
}

Door.prototype.action = function() {
    rpio.write(config.pin.action, rpio.LOW)
    sleep.sleep(1000)
    rpio.write(config.pin.action, rpio.HIGH)
}

module.exports = Door;
