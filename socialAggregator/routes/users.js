var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('1031858530193291','4bf4cc30cf96f901bde0d8eafae639b4');
var twitter = require('../services/twitter')('VufICSixxf3haoegxui49eLdD','vZgmocF9hRTEojl42n0HnfPj1tK701o3MZwdCYH2FxouqXAXrz');

router.use('/', function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

router.use('/', function(req, res, next) {
    if (req.user.twitter) {
        twitter.getUserTimeLine(
            req.user.twitter.token,
            req.user.twitter.tokenSecret,
            req.user.twitter.id,
            function(results) {
                req.user.twitter.lastPost = results[0].text;
                next();
            }
        );
    }
});

/* GET users listing. */
router.get('/', function(req, res) {
    if (req.user.facebook) {
        facebook.getImage(req.user.facebook.token,
            function(results) {
                req.user.facebook.image = results.url;
                console.log('AQUI' + results.url);
                res.render('users', { user: req.user });
            }
        );
    }
    else {
        res.render('users', { user: req.user });
    }
});

module.exports = router;
