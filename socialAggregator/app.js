var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(GoogleStrategy(
        {
            clientID: '1026465773271-rmrnp1gqvj26k9qdgbo8g6c4nt8b8ni0.apps.googleusercontent.com',
            clientSecret: 'EXaXNBcu-FKLiZeKB_Z4oWfk'
            callbackURL: 'http://localhost:3000/auth/google/callback', // Where google will send user back to when auth is done
        },
        function(req, accessToken, refreshToken, profile, done) { // When google sends something to callbackURL
            done(null, profile);
        }
    )
);

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


app.use(session({ secret: 'anything' }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// This is what passport needs to place a user into the session
passport.serializeUser(function(user, done) {
    done(null, user); // null = error
});

// Put user out of the session
passport.deserializeUser(function(user, done) {
    done(null, user);
});

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


module.exports = app;
