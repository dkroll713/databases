var express = require('express');
var db = require('./db');
const path = require('node:path');

// Middleware
var morgan = require('morgan');
var cors = require('cors');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());



// Set up our routes
app.use('/classes', router);

// Serve the client files
console.log(__dirname);
// static should do everything  to load the page in backend server app
app.use(express.static(path.join(__dirname + '/../client')));

app.use(router);
// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

