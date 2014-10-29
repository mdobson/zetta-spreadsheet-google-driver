var Spreadsheet = require('edit-google-spreadsheet');
var Scout = require('zetta-scout');
var util = require('util');
var GoogleDriver = require('./google_spreadsheet_driver');

var GoogleScout = module.exports = function(spreadsheetName, worksheetName) {
  Scout.call(this);
  this._spreadsheetName = spreadsheetName;
  this._worksheetName = worksheetName;
};
util.inherits(GoogleScout, Scout);

GoogleScout.prototype.init = function(next) {
  var self = this;

  Spreadsheet.load({
    debug: true,
    spreadsheetName: this._spreadsheetName,
    worksheetName: this._worksheetName,
    username: process.env.EMAIL,
    password: process.env.PASSWORD
  }, function ready(err, spreadsheet){
    if(!err) {
      self.discover(GoogleDriver, spreadsheet);
    } else {
      self.server.log('Error initializing google spreadsheet:' + err);
    }
  }); 


  next();
};






