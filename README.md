# Google spreadsheet zetta device

This is a simple state machine that wraps the [edit google spreadsheet module](https://github.com/jpillora/node-edit-google-spreadsheet).
This state machine isn't meant to be consumed in the API, it should be used only in apps or in other state machines.

## Usage

To use this module you'll need to set two environment variables. One for your email, and another for your password to the account. Replace the below shell script
to use your own email credentials.

```bash
printf "export EMAIL=you@foo.com\nexport PASSWORD=12345678" > .env.sh
```

```bash
source env.sh
```

```bash
$ npm install zetta-spreadsheet-google-driver --save
```

```javascript
var zetta = require('zetta');
var Google = require('zetta-spreadsheet-google-driver');

zetta()
  .use(Google)
  .listen(1337);
```



## License

MIT
