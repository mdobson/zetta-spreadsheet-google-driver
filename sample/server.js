var zetta = require('zetta');
var Google = require('./index');
var AutoScout = require('zetta-auto-scout');
var LEDDriver = require('./led_driver');

var LED = new AutoScout('led', LEDDriver);

zetta()
  .name('matt.dobson')
  .use(Google)
  .use(LED)
  .load(function(server) {
    var ledQuery = server.where({ type: 'led' });
    var googleQuery = server.where({ type: 'google' });

    server.observe([ledQuery, googleQuery], function(led, google) {
      led.on('turn-on', function() {
        google.call('update', { 1: 'turn-on', 2: new Date().toString()}, function() {
          console.log(arguments);
        });
      });
    });
  })
  .listen(1337);

