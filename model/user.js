var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs")
var schema=mongoose.Schema;

var userSchema=new schema({
    local:{
        name    :   {type: String},
        email   :   {type: String},
        password:   {type: String},
        roles   :   {type : String, default : 'user'}
    },
    facebook:{
        id      :   String,
        token   :   String,
        name    :   String,
        email   :   String
    }

})

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null)
}
userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.local.password)
}

module.exports=mongoose.model("userPassport",userSchema)