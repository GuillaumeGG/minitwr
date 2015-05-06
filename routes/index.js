var express = require('express');
var router = express.Router();

var tweets = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Lord of the Tweets', tweets: tweets });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Profil' });
});

router.get('/profil', function(req, res, next) {
  res.render('profil', { title: 'Inscription' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/', function(req, res, next) {
    tweets.unshift(req.body.tweet);
    res.redirect('/')
});

module.exports = router;
