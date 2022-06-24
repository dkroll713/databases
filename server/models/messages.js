var db = require('../db');
const mysql = require('mysql2');
const connection = require('../db/index.js');

module.exports = {

  nextId: 0,
  userId: 0,
  roomId: 0,

  getAll: function () {

    // console.log('connection:', connection);
    connection.connection.connect();
    if (connection.connection.state === 'disconnected') {
      return respond(null, { status: 'fail', message: 'server down'});
    } else {
      console.log(connection.connection.query);
    }
    connection.connection.query( // selects all messages in the database, showing user, room, & text
      'select u.username, r.room, m.messageText from messages m inner join usernames u on u.id = m.id_usernames inner join rooms r on r.id = m.id_rooms;'
      , function(err, results, fields) {
        if (err) {
          console.error('error', err);
          throw err;

        }
        console.log('results:', results);
        // console.log('fields:', fields);
      });

  }, // a function which produces all the messages
  create: function (username, message, roomname) {
    var userId = 0;
    var roomId = 0;
    connection.connection.connect();
    console.log('check message input:', username, message, roomname);

    // Get all here
    // connection.connection.query( // selects all messages in the database, showing user, room, & text
    //   'select * from messages;'
    //   , function(err, results, fields) {
    //     if (err) {
    //       console.error('error', err);
    //       throw err;
    //     }
    //     console.log('last used id:', results[results.length - 1].id);
    //     nextId = results[results.length - 1].id + 1;
    //     console.log('the next message id will be:', nextId);
    //     // console.log('fields:', fields);
    //   });

    connection.connection.query(
      'select u.id from usernames u where u.username=?', username, (err, results, fields) => {
        if (err) {
          throw err;
        }
        console.log('username id:', results, results[0].id);
        module.exports.userId = results[0].id;

        // callback for rooms
        connection.connection.query(
          'select r.id from rooms r where r.room=?', roomname, (err, results, fields) => {
            if (err) {
              throw err;
            }
            console.log('room id:', results[0].id);
            module.exports.roomId = results[0].id;
            console.log('\n\nsecond checkusername id:', module.exports.userId, 'room id:', module.exports.roomId);

            // callback for message insertion
            connection.connection.query(
              'insert into messages(id_usernames, id_rooms, messageText) values(?, 1, ?)', [module.exports.userId, message], (err, results, fields) => {
                if (err) {
                  console.log('insert check 1:', module.exports.userId, module.exports.roomId);

                  throw err;
                } else {
                  console.log('insert check 2:', module.exports.userId, module.exports.roomId);
                  console.log(results);
                }
              }
            );

          }
        );

      }
    );





  } // a function which can be used to insert a message into the database
};


