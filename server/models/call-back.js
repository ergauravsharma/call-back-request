const mongoose = require('mongoose');

const Schema = mongoose.Schema;

  const callBackSchema = mongoose.Schema({
    ticketID:{type:String},
    ldap:{type:String},
    reason:{type:String},
    date:{type:Date},
    time:{type:String},
    done:{type:String,
    defult:"No"},
    supervised_by:{type:String},
    supervised_date:{type:Date},
    created_at:{
        type:Date,
        default:Date.now() 
       }
});

const callBack = module.exports = mongoose.model('callBack', callBackSchema, 'callBack');

