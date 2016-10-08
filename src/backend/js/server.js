// ******************
// REQUIREMENTS
// This code must be ES5
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

app.use('/', express.static('rootDir'))
app.use('/dist', express.static('dist'))
app.use('/admin', express.static('rootDir'))
app.use('/login', express.static('rootDir'))
app.use('/login/:invitationId', express.static('rootDir'))
