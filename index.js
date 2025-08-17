const express = require("express");
const urlRoute = require("./Router/urlRouter")
const connectToDatabase = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const staticRoute = require('./Router/staticRouter')
const userRoute = require('./Router/User')
const  {restrictToLoggedInUserOnly,checkAuth} = require('./middleWare/auth')


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.set('views',path.resolve("./Views"))
app.use(cookieParser())

app.get('/home',(req,res)=>{
 return  res.render('Home')}
)

connectToDatabase()


app.use('/url',restrictToLoggedInUserOnly,urlRoute)
app.use('/users',userRoute)
app.use("/",checkAuth,staticRoute)

app.listen(3000,()=> console.log("server started at port 3000"))