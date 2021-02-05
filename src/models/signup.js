const mongoose=require('mongoose')

const signupSchema=new mongoose.Schema({
    position:{
              type:String,
              required:true,
              
    },
    
  
    

    


},)


const Signup=mongoose.model('Signup',signupSchema)

module.exports=Signup