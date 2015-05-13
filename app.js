var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
//var session = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(express.session());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Definition de users (login test) et de Passport

var users = 
{
  'test':'test'
};

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },

// Definition de la strategie de passeport

function(username, password, done)
{
  if (users[username] != password)
    return done(null, false, {message: "Le nom d'utilisateur ou le mot de passe est incorrect."});
  else
    return done(null, {username: username});
}));

// Definition du serealize et deserealize de l'utilisateur

passport.serializeUser(function(user, done) 
{
  done(null, user.id);
});

passport.deserializeUser(function(id, done) 
{
  if (users[username])
    return done(null, {username:username});
  else
    return done(new Error("L'utilisateur" + username + " est inexistant"));
});

router.get('/inscription', loginGet);

function loginGet(req, res){
  if(req.users)
  {
    // already logged in
    res.redirect('/');
  } else 
  {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
    res.render('inscription', { message: req.session.messages });
    // and then remember to clear the message
    req.session.messages = null;
  }
}

app.post('/inscription', loginPost);

function loginPost(req, res, next) {
  // ask passport to authenticate
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // if error happens
      return next(err);
    }
    
    if (!user) {
      // if authentication fail, get the error message that we set
      // from previous (info.message) step, assign it into to
      // req.session and redirect to the login page again to display
      req.session.messages = info.message;
      return res.redirect('/inscription');
    }

    // if everything's OK
    req.logIn(user, function(err) {
      if (err) {
        req.session.messages = "Error";
        return next(err);
      }

      // set the message
      req.session.messages = "Login successfully";
      return res.redirect('/');
    });
    
  })(req, res, next);
}

module.exports = app;
