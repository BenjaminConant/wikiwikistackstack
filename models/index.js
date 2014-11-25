var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
var Page, User;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;


var pageSchema = new Schema({
  name:  String,
  title: String,
  url_name: String,
  owner_id:   String,
  body:   String,
  date: { type: Date, default: Date.now },
  status: Number
});

var findOrCreate = require('mongoose-findorcreate'); 

var userSchema = new Schema({
  username: { type: String, required: true, index: {unique: true} },
  password: { type: String, required: true},
  email: Array
});

userSchema.plugin(findOrCreate);


userSchema.pre('save', function(next) {
  var user = this;
// only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
 
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

     
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
     
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

 
Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);
 
module.exports = {"Page": Page, "User": User};
