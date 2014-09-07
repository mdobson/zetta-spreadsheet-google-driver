var util = require('util');
var Device = require('zetta').Device;

var LED = module.exports = function() {
  Device.call(this);
};
util.inherits(LED, Device);

LED.prototype.init = function(config) {
  config
    .type('led')
    .state('off')
    .name('myled')
    .when('off', { allow: ['turn-on'] })
    .when('on', { allow: ['turn-off'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff);
};

LED.prototype.turnOn = function(cb) {
  this.state = 'on';
  cb();
};

LED.prototype.turnOff = function(cb) {
  this.state = 'off';
  cb();
};
