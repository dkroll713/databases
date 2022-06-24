var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/', (req, res) => {
  res.redirect('/chatterbox.html');
} );


router.get('/messages' || `http//localhost:3000/messages`, controller.messages.get);

router.post('/messages*', controller.messages.post);

router.get('/users', controller.users.get);

router.post('/users*', controller.users.post);


module.exports = router;

