var models = require('../models');
// var App = require('../../client/scripts/app.js');
// var App = require('../app.js');
// var username = App.username;


module.exports = {
  get: function (req, res) {
    res.status(200).send('getting usernames');
    models.users.getAll();
  },
  post: function (req, res) {
    res.status(201).send('inserting username into database');
    console.log('body:', req.body);
    console.log('message:', req.body.message);
    models.users.create(req.body.username);
  }

};
