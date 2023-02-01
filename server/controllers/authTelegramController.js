const authTelegramService = require('../services/authTelegramService')

const authTelegramController = async (req,res) => {
    try{
        const {success} = await authTelegramService(req,res)
        if(error){
            throw new Error(error)
        }
        res.status(202).json({success})
          
    }catch(error){
        console.log(error)
        res.status(500).json({success})
    }
}

module.exports = authTelegramController