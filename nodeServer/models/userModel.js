const mongoose=require('mongoose');
const ttl=require('mongoose-ttl');
const uniqueValidator=require('mongoose-unique-validator');
const schema=mongoose.Schema;

const userSchema= new schema({
    name:{type:String,required:true},
    password:{type:String,required:true,minlength:6},
    groupId:{type:String,required:true,unique:true}
}, {timestamps: true});

userSchema.plugin(uniqueValidator);
userSchema.index({createdAt: 1},{expireAfterSeconds: 86400});

module.exports=mongoose.model('User',userSchema);