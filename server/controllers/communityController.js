const sendMail = require('../services/sendMail.js')

const communityController = async (req, res) => {
  try{
    const {success} = await sendMail(req,res)
    if(!success){
        throw new Error('Email not send')
    }
    res.status(200).json({success:true})
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,error})
  } 
   
}
  

module.exports = communityController