const express = require('express')
const router = express.Router();
const { handleGenerateShortUrl, handleGetShortUrl,handleGetHistory } = require('../Controllers/url');

//post
router.post('/',handleGenerateShortUrl);

//get 
router.get('/:shortId',handleGetShortUrl)

//get visit histoy
router.get('/urlHistory/:shortId',handleGetHistory)

module.exports = router;