var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

module.exports = function() {
    passport.use(new TwitterStrategy(
        {
            consumerKey: 'VufICSixxf3haoegxui49eLdD',
            consumerSecret: 'vZgmocF9hRTEojl42n0HnfPj1tK701o3MZwdCYH2FxouqXAXrz',
            callbackURL: 'http://localhost:3000/auth/twitter/callback',
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) { // Function that will be called when twitter call the callbackURL

            // If user already exists in db attach twitter id and token. Then save it to tb and pass it back to passport
            if(req.user) {
                var query = {};
                if (req.user.google) {
                    console.log('google');
                    var query = { 'google.id': req.user.google.id };
                }
                else if (req.user.facebook) {
                    console.log('facebook');
                    var query = { 'facebook.id': req.user.facebook.id };
                }

                User.findOne(query, function(error, user) {
                    user.twitter = {};
                    user.twitter.id = profile.id;
                    user.twitter.token = token;
                    user.twitter.tokenSecret = tokenSecret;

                    user.save();
                    done(null, user);
                });

            }
            // Otherwise create an user or look up the existing one
            else {
                var query = { 'twitter.id': profile.id };

                User.findOne(query, function(error, user) {

                    if(user) {
                        console.log('found - twitter');
                        done(null, user);
                    }
                    else {
                        var user = new User;

                        console.log('not found - twitter')
                        // user.email = profile.emails[0].value;
                        user.image = profile._json.profile_image_url;
                        user.displayName = profile.displayName;

                        user.twitter = {};
                        user.twitter.id = profile.id;
                        user.twitter.token = token;
                        user.twitter.tokenSecret = tokenSecret;

                        user.save();

                        done(null, user);
                    }
                });
            }

        }
    ));
}
