var db = require('../db');
const mysql = require('mysql2');
const connection = require('../db/index.js');

module.exports = {
  nextUserId: 0,
  getAll: function () {
    connection.connection.connect();
    console.log(connection.connection.query);
    connection.connection.query(
      'SELECT * from usernames;',
      (err, results, fields) => {
        if (err) {
          console.error('error reading username', err);
          throw err;
        }
        console.log('usernames:', results);
      });
  },
  create: function (username) {
    connection.connection.connect();

    connection.connection.query(
      'select max(id) from usernames;',
      (err, results, fields) => {
        if (err) { throw err; }
        console.log('largest user id', results);
        module.exports.nextUserId = results[0]['max(id)'] + 1;
        console.log('the next user id is:', module.exports.nextUserId);
      }

    );

    connection.connection.query(
      'insert into usernames(id, username) values(?,?)',
      [module.exports.nextUserId, username],
      (err, results, fields) => {
        if (err) { throw err; }
        console.log(results);
      }
    );
  }
};
