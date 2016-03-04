var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');

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

            var query = { 'facebook.id': profile.id };

            User.findOne(query, function(error, user) {
                if(user) {
                    console.log('found - facebook user');
                    done(null, user);
                }
                else {
                    var user = new User;
                    console.log('not found - facebook user');
                    var user = new User();
                    user.email = profile.emails[0].value;
                    user.displayName = profile.displayName;

                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;

                    user.save();
                    done(null, user);
                }
            });

        }
    ));
}
