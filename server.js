var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var routes = requires('');
var flash = require('connect-flash'); // Need this for the failureFlash and successFlash to show
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUnintialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);

// Configure CORS with Dynamic Origin
var whitelist = ['http://chieakiba.github.io']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
  }
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) { //change the endpoint
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

// Mongoose
mongoose.connect('mongodb://localhost/beerAPI');

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For flash message to work in passport
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  res.redirect('/');
});

app.get('/', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  res.render('index', { messages: req.flash('info') });
});

var Account = require('./models/account');
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: 'Invalid username or password.', successFlash: 'Welcome!' }), //redirects user to home page is authentication is successful and if unsuccessful, redirects user back to the login page for another attempt. failureFlash will flash an error message to the user
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.listen(process.env.PORT || 8080);
