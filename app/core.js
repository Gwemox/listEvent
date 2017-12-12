var express = require('express');
var { Template } = require('./src/template.js');
var app = express();

app.use('/public', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.get('*', function(req, res){
  res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
  res.end((new Template('errors/404')).html);
});

app.listen(1313);
