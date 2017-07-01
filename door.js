var rpio = require('rpio')
var sleep = require('sleep')

var config = require('./config')

function Door() {
    rpio.open(config.pin.action, rpio.OUTPUT, rpio.LOW)
}

Door.prototype.action = function() {
    rpio.write(config.pin.action, rpio.HIGH)
    sleep.msleep(150)
    rpio.write(config.pin.action, rpio.LOW)
}

module.exports = Door
