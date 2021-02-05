const express=require('express')
const Signup = require('../models/signup')

exports.postSignup=async (req,res)=>{

//    const signup=new Signup({
//        position:req.body.position
      
    
//    })
   if(req.body.position.toLowerCase()=='tester'){
    res.redirect('/tester')
   }
    

}
exports.getSignup=async (req,res)=>{
    res.render('signup')
}