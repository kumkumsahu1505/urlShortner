const express = require("express");
const urlModel = require("../Models/url");
const router = express.Router();


router.get('/',async(req,res)=>{
   if(!req.user)
       return res.redirect('/login');
      
   const allUrl =await urlModel.find({createdBy: req.user._id})
   return res.render('Home',{urls:allUrl})
})

router.get('/signUp',async(req,res)=>{
   return res.render('SignUp')
})
router.get('/login',async(req,res)=>{
   return res.render('login')
})

module.exports = router;