const express=require('express')
const Tester=require('../models/tester')
const authController = require('../Controllers/tester');

const router=new express.Router()

router.post('/tester',authController.postTester);
router.get('/tester',authController.getTester)


module.exports=router
// router.post('/tester',async (req,res)=>{
// const tester=new Tester({
//     name:req.body.name,
//     email:req.body.email,
//     password:req.body.password
// })
    
    
//     try{
//         await tester.save()
        

//         res.status(201).send({tester})
    
//     } catch(e){
//     res.status(400).send(e)
//     }
    
  
    
    
//     }) 

//     // router.get('/tester/me',async (req,res)=>{
//     //     // res.send(req.user)
//     //      Tester.find({}).then((tester)=>{
//     //        res.send(tester)
//     //      }).catch((e)=>{
//     //       res.status(500).send()
//     //      })
//     //  })
//     router.get('/tester',async (req,res)=>{
//         res.render('signup')
//     })  
