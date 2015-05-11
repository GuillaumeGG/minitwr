var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

app.get('/login', loginGet);

function loginGet(req, res){
  if(req.user)
  {
    // already logged in
    res.redirect('/');
  } else 
  {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
    res.render('login', { message: req.session.messages });
    // and then remember to clear the message
    req.session.messages = null;
  }
}
