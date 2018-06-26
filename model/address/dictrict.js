var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    _id : Number,
    dictrict : {type:String,required:true},
    idProvince : Number
});

module.exports=mongoose.model('dictrict',schema);