const short_id = require('shortid');
const urlModel = require('../Models/url');



async function handleGenerateShortUrl (req,res) {
   const body = req.body;
    let shortId;
   if(!body || !body.url) {
      return res.status(400).json({message: "please privide a url"})
   }
  const preUrldata =  await urlModel.findOne({redirectUrl : body.url})
  
   if(!preUrldata){
       shortId = short_id(10)
   }
   else {
     return res.render('Home',{id:preUrldata.shortId})
   }
    
   await urlModel.create({
    shortId : shortId,
    redirectUrl : body.url,
    VisitHistory : [],
    createdBy : req.user._id
   })
   
   return res.render('Home',{id:shortId})
   // return res.json({id: shortId})
   
}

async function handleGetShortUrl(req,res){
   
   const shortId = req.params.shortId;
   
   const currentDate = new Date();
   if(!shortId)
      return res.status(400).json({"message":"please provide a shortId"})
   const redirectUrl = await urlModel.findOneAndUpdate({shortId},
      {$push:
         {VisitHistory :
            {timeStamp : currentDate.toString()}
         }
      })
   if(!redirectUrl)
      return res.status(400).json({message:"shortUrl is not present"})
   return res.redirect(redirectUrl.redirectUrl)
}

async function handleGetHistory(req, res) {
    const shortId = req.params.shortId;
    if(!shortId)
      return res.status(400).json({"message":"please enter a shortId"})
   const id = await urlModel.findOne({shortId});
   if(!id)
      return res.status(400).json({"message":"please enter a valid shortId"})
   const result = `total clicks :${id.VisitHistory.length}<br>
   timing of Clicks : ${id.VisitHistory.map(item => item.timeStamp).join('<br>')}`
   return res.send(result)
}

module.exports = {handleGenerateShortUrl, handleGetShortUrl, handleGetHistory}
