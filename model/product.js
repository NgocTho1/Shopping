var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    imagePath:      {type: Array, required:true},
    tittle :        {type: String, required:true},
    tittleLink:     {type: String, required:true},
    cateId :        {type : String},
    description:    {type: String, required:true},
    price:          {type: Number, require:true},
    saleOff:        Number,
    qty :           {type : Number, required : true}
});
schema.index({'tittle' : 'text'});
module.exports=mongoose.model('Product', schema);