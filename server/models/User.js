// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
      },

    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}
,

{
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
  }
  
  module.exports.getUserByUsername = function(username, callback) {
      const query = {username: username}
      User.findOne(query, callback);
    }
  
  module.exports.addUser = function(newUser, callback) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
        });
      });
    }
    
    module.exports.comparePassword = function(candidatePassword, hash, callback) {
      bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
      });
    }