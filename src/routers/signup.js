const express=require('express')
const Signup=require('../models/signup')

const authController = require('../Controllers/signup');

const router=new express.Router()

router.post('/signup',authController.postSignup);
router.get('/signup',authController.getSignup)

module.exports=router

