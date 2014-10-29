var Spreadsheet = require('edit-google-spreadsheet');
var Scout = require('zetta-scout');
var util = require('util');
var GoogleDriver = require('./google_spreadsheet_driver');

var GoogleScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(GoogleScout, Scout);

GoogleScout.prototype.init = function(next) {
  var self = this;

  Spreadsheet.load({
    debug: true,
    spreadsheetName: 'Intrusions-Demo',
    worksheetName: 'Sheet1',
    username: process.env.EMAIL,
    password: process.env.PASSWORD
  }, function ready(err, spreadsheet){
    if(err) {
      self.discover(GoogleDriver, spreadsheet);
    } else {
      self.server.log('Error initializing google spreadsheet:' + err);
    }
  }); 


  next();
};






