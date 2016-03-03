var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
    passport.use(new GoogleStrategy(
            {
                clientID: '1026465773271-rmrnp1gqvj26k9qdgbo8g6c4nt8b8ni0.apps.googleusercontent.com',
                clientSecret: 'EXaXNBcu-FKLiZeKB_Z4oWfk',
                callbackURL: 'http://localhost:3000/auth/google/callback' // Where google will send user back to when auth is done
            },
            function(req, accessToken, refreshToken, profile, done) { // When google sends something to callbackURL
                done(null, profile);
            }
        )
    );
}
