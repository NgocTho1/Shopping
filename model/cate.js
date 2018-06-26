var mongoose = require('mongoose');
var Schema = mongoose.Schema
//mongoose.Promise = global.Promise;

var schema = new Schema({
    name : String,
    url : String,
});

module.exports = mongoose.model('cate', schema)