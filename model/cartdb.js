var mongoose = require('mongoose');
var schema = mongoose.Schema;

var cartdb = new schema({
    idUser : String,
    cartUser : Object
});

module.exports = mongoose.model('cartdb', cartdb);