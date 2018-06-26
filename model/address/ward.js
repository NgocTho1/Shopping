var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    ward : {type:String,required:true},
    idDictrict : Number
});

module.exports=mongoose.model('ward',schema);