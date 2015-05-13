var express = require('express');
var router = express.Router();

var tweets = [];
var utilisateurs = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Lord of the Tweets', tweets: tweets, utilisateurs: utilisateurs });
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription', { title: 'Inscription' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/', function(req, res, next) {
    tweets.unshift(req.body.tweet);
    utilisateurs.unshift(req.body.user);
    res.redirect('/')
});

module.exports = router;
