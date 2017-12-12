var express = require('express');
var { Template } = require('./src/template.js');
var app = express();

app.use('/public', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end((new Template('index')).html);
});

app.get('*', function(req, res){
  res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
  res.end((new Template('errors/404')).html);
});

app.listen(1313);
