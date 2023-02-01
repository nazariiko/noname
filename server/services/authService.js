const User = require('../models/userModel')

const authService = async (req,res) => {
    try{
        const {address,balance} = req.body
    
        const user = await User.findOne({address})
    
        if(user){
          return {success:true,user} 
        }
    
        const newUser = await User.create({address,balance})
        
        return {success:true,user:{...newUser._doc},error:''} 
          
    }catch(error){
        console.log(error)
        return {success:false,user:{},error} 
    }
}


module.exports = authService