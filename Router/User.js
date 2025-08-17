const express = require('express');
const router = express.Router();
const { handleSignIn } = require('../Controllers/User.js');
const {handleLoggedIn} = require('../Controllers/User.js');

router.post('/',handleSignIn)
router.post('/login',handleLoggedIn)

module.exports = router