var Device = require('zetta').Device;
var util = require('util');

var GoogleDriver = module.exports = function(spreadsheet) {
  Device.call(this);
  this._spreadsheet = spreadsheet;
};
util.inherits(GoogleDriver, Device);

GoogleDriver.prototype.init = function(config) {
  config
    .type('google')
    .state('ready')
    .name('GoogleLog')
    .when('ready', { allow: ['update'] })
    .map('update', this.update, [{type:'text', name: 'data'}]);
};

GoogleDriver.prototype.update = function(data, cb) {

  function append(data, spreadsheet) {
    spreadsheet.receive(function(err, rows, info) {
      var nextRow = info.nextRow;

      var row = {};
      row[nextRow] = data;
      spreadsheet.add(row);
      spreadsheet.send(function(err) {
        if(cb) {
          if(err) {
            cb(err);
          } else {
            cb();
          }
        }
      });
    });
  }

  append(data, this._spreadsheet);
};
