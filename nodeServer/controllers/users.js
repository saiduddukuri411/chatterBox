const Httperror=require('../models/http_error');
const signUp=(req,res,next)=>{
  res.status(200).json({message:"success"});
};

module.exports={signUp}