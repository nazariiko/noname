const authTelegramService = async (req,res) => {
    try{
        const {tgUser} = req.body    
        if(tgUser){
          return {success:true} 
        }
    }catch(error){
        console.log(error)
        return {success:false} 
    }
}

module.exports = authTelegramService