const express=require('express')
const Tester=require('../models/tester')

exports.postTester=async (req,res) =>{
    const tester=new Tester({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
        
        
        try{
            await tester.save()
            
    
            res.status(201).send({tester})
        
        } catch(e){
        res.status(400).send(e)
        }
        
}

exports.getTester=async (req,res)=>{
    res.render('signup')

}