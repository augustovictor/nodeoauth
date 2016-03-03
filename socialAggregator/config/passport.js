var passport = require('passport');

module.exports = function(app) {
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

    require('./strategies/google.strategy')(); // It returns a function so it must be executed '()'

}
