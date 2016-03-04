var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    displayName: { type: String },
    image:       { type: String },
    email:       { type: String },
    facebook:    { type: Object },
    twitter:     { type: Object },
    google:      { type: Object },
});

modules.export = mongoose.model('User', UserSchema);
