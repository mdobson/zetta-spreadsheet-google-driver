var zetta = require('zetta');
var Google = require('../index');
var LED = require('./led_driver');

zetta()
  .name('matt.dobson')
  .link('http://hello-zetta.herokuapp.com')
  .use(Google)
  .use(LED)
  .use(function(server) {
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

