var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
    passport.use(new FacebookStrategy(
        {
            clientID: '1031858530193291',
            clientSecret: '4bf4cc30cf96f901bde0d8eafae639b4',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(req, accessToken, refreshToken, profile, done) {
            var user = {};

            user.email = profile.emails[0].value;
            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            done(null, user);
        }
    ));
}
