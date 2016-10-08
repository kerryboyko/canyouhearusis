// ******************
// REQUIREMENTS
// ******************

var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var http = require('http');

var app = express();
var server = http.Server(app);

server.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

app.use(cors());
app.use(bodyParser.json({
  limit: '100mb'
}));
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));

app.use('/', express.static('./'));
app.use('/dist', express.static('dist'));
app.use('/about', express.static('./'));
app.use('/constitution', express.static('./'));
app.use('/learn', express.static('./'));
app.use('/img', express.static('../img'));
