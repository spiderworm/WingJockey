
var express = require('express');

var app = express();

app.use('/require.js', express.static('node_modules/requirejs/require.js'));
app.use('/babel.js', express.static('node_modules/requirejs-babel/babel-5.8.22.min.js'));
app.use('/es6.js', express.static('node_modules/requirejs-babel/es6.js'));
app.use('/cannon.js', express.static('node_modules/cannon/build/cannon.js'));
app.use('/three.js', express.static('node_modules/three/three.js'));
app.use('/client', express.static('client'));
app.use('/game', express.static('game'));
app.use('/shared', express.static('shared'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
