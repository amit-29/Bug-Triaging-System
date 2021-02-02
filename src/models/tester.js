const mongoose=require('mongoose')
//const mongodb=require('mongodb')
const validator=require('validator')
//const ObjectID=mongodb.ObjectID


const testerSchema=new mongoose.Schema({
    name:{
              type:String,
              required:true,
              trim:true
    },
    email:{
           type:String,
           unique:true,
           required:true,
           trim:true,
           lowercase:true,
           validate(value){
               if(!validator.isEmail(value)){
                   throw new Error('Email invalid')
               }
           }
    },
  
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    
    projectid:{
        type:mongoose.Schema.Types.ObjectId,
 },
    


},{
    timestamps:true
})


const Tester=mongoose.model('Tester',testerSchema)

module.exports=Tester