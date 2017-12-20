var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.json');
var fs = require('fs');
var app = express();

var json2csv = require('json2csv');
var csvjson = require('csvjson');
var urlParser = bodyParser.urlencoded({extended: true})

const respondWithTemplate = (res, name, httpCode = 200) => {
    res.render(name + '.haml');
}

app.engine('haml', require('consolidate').haml);
app.set('views', __dirname + '/views');
console.log(__dirname + '../dist')
app.use('/public', express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
  respondWithTemplate(res, 'index');
});

app.get('/register', (req, res) => {
  respondWithTemplate(res, 'register');
});

app.get('/list', (req, res) => {
  respondWithTemplate(res, 'list');
});

app.post('/api/register', urlParser, (req, res) => {
  let data;
  try {
    let dataText = fs.readFileSync(config.dbPath, { encoding : 'utf8'});
    data = csvjson.toSchemaObject(dataText, config.csvOptions);
  } catch (exception) {
    data = [];
  }
  data.push(req.body);
  let csvData = json2csv({data: data, fields: config.fields, del: config.csvOptions.delimiter, quotes: config.csvOptions.quote})
  fs.writeFile(config.dbPath, csvData, (err) => {
    if (err) throw err;
  });
  res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(`{"code": 201, "message":"Bonjour ${req.body.firstname}, vous êtes désormais inscrit !"}`);
});

app.delete('/api/delete', urlParser, (req, res) => {
  let data;
  try {
    let dataText = fs.readFileSync(config.dbPath, { encoding : 'utf8'});
    data = csvjson.toSchemaObject(dataText, config.csvOptions);
    if (!Array.isArray(req.body.deleted))
    {
      req.body.deleted = [req.body.deleted]
    }
    req.body.deleted.reverse().forEach(item => {
      data.splice(item, 1);
    })
  } catch (exception) {
    data = [];
  }

  let csvData = json2csv({data: data, fields: config.fields, del: config.csvOptions.delimiter, quotes: config.csvOptions.quote})
  fs.writeFile(config.dbPath, csvData, (err) => {
    if (err) throw err;
  });

  let response = {
    "code": 200,
    "data": data
  }
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(response));
});

app.get('/api/list', (req, res) => {
  let data;
  try {
    let dataText = fs.readFileSync(config.dbPath, { encoding : 'utf8'});
    data = csvjson.toSchemaObject(dataText, config.csvOptions);
  } catch (exception) {
    data = [];
  }
  let response = {
    "code": 200,
    "data": data
  }
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(response));
});

app.get('*', (req, res) => {
  respondWithTemplate(res, 'errors/404');
});

app.listen(1313);
