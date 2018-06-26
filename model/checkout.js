var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs")
var Schema = mongoose.Schema;

var schema = new Schema({
    name : String,
    idUser : String,
    sdt : Number,
    date : String,
    province : String,
    dictrict : String,
    ward : String,
    msg : String,
    status : { type : Number, default : 0},
    cart : Object,
});

module.exports=mongoose.model('dat-hang',schema);