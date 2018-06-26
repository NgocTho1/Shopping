var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    _id : Number,
    province:{type:String,required:true},
    
});

module.exports=mongoose.model('province',schema);