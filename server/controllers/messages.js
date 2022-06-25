var models = require('../models');

var message = 'test message';
var app = require('../app');


module.exports = {
  get: function (req, res) {
    // var messages = models.messages.getAll();
    // res.status(200).send(messages);
    model.messages.getAll().then(result => res.status(200).send(result));

  }, // a function which handles a get request for all messages
  post: function (req, res) {
    res.status(201).send('inserting message into database');
    console.log(req.body);
    var username = req.body.username || req.query.username;
    var message = req.body.messageText || req.body.message || req.query.message;
    var roomname = req.body.roomname || req.query.roomname;
    console.log('\nINCOMING MESSAGE:\nusername', username, 'wants to post "', message, '" to room:', roomname, '\n');
    models.messages.create(username, message, roomname);
  } // a function which handles posting a message to the database
};
