const express = require("express");
const urlModel = require("../Models/url");
const router = express.Router();

router.get('/',async(req,res)=>{
   const allUrl =await urlModel.find({})
   return res.render('Home',{urls:allUrl})
})

module.exports = router;