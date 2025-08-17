const user = require('../Models/User.js');
const { v4: uuidv4 } = require('uuid');
const {setUser , getUser} = require('../Service/auth.js');

async function handleSignIn(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: "ALl fields are required" })
    }

    try {
        await user.create({ name, email, password });
        return res.render('Home');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function handleLoggedIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "ALl fields are required" })
    }

    try {
      const findData =  await user.findOne({email,password})
      if(!findData){
        return res.render('SignUp',{error:"Invalid Credentials"})
      }
      const sessionId = uuidv4();
      setUser(sessionId,findData)
      res.cookie('uid',sessionId)
      return res.redirect('/');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports = { handleSignIn , handleLoggedIn };