const authService = require('../services/authService')

const authController = async (req,res) => {
    try{
        const {success,user,error} = await authService(req,res)
        if(error){
            throw new Error(error)
        }
        res.status(202).json({success,user})
          
    }catch(error){
        console.log(error)
        res.status(500).json({success,error,user:{}})
    }
}

module.exports = authController