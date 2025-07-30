const express = require("express");
const urlRoute = require("./Router/urlRouter")
const connectToDatabase = require('./connection');
const path = require('path');
const app = express();
const staticRoute = require('./Router/staticRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs');
app.set('views',path.resolve("./Views"))

app.get('/home',(req,res)=>{
 return  res.render('Home')}
)

connectToDatabase()
app.use('/url',urlRoute)

app.use("/",staticRoute)

app.listen(3000,()=> console.log("server started at port 3000"))