var models = require('../models');

var message = 'test message';

module.exports = {
  get: function (req, res) {
    res.status(200).send('extracting data from database');
    models.messages.getAll();
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    res.status(201).send('inserting message into database');
    // console.log(req.query);
    var username = req.query.username;
    var message = req.query.message;
    var roomname = req.query.roomname;
    console.log('\nINCOMING MESSAGE:\nusername', username, 'wants to post "', message, '" to room:', roomname, '\n');
    models.messages.create(username, message, roomname);
  } // a function which handles posting a message to the database
};
