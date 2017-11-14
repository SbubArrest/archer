var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://Loganrose:RiceBirds12@ds147544.mlab.com:47544/archer', { useMongoClient: true })
  .then(() => {
    console.log('connection succesful')
  })
  .catch((err) => console.error(err));

require('./models/User.js');
require('./models/Server.js')
const passport = require("passport");
const passportSocketIo = require("passport.socketio");
const discordStrategy = require("passport-discord").Strategy;
const session = require("express-session");
const discordOAuthScopes = ["identify", "guilds", "email"];
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var servers = require('./routes/servers');
var activity = require('./routes/activity');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/servers', servers);
app.use('/activity', activity);

passport.use(new discordStrategy({
  clientID: "205281714715492352",
  clientSecret: "macyQE2tbUKa5-j17PPfekQ56LY4ejzh",
  callbackURL: `https://archer-loganrose4.c9users.io/login/callback`,
  scope: discordOAuthScopes
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    return done(null, profile);
  });
}));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});
const getAuthUser = user => {
  return {
    username: user.username,
    id: user.id,
    avatar: user.avatar ? (`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`) : "./public/images/avatar.png"
  };
};
app.use(session({
  secret: "ekQ56f-j1zha5E2tbcLY4ejyUKP7PmaQ",
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/login", passport.authenticate("discord", {
  scope: discordOAuthScopes
}));

app.get("/login/callback", passport.authenticate("discord", {
  failureRedirect: "/login"
}), (req, res) => {
  res.redirect('/');

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
