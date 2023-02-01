const User = require('../models/userModel')

const removeFavourite = async (req) => {
    try{
        const {id,address} = req.body
        
        const user = await User.findOne({address})

        user.favourites = user.favourites.filter((itemId) => itemId !== id)

        await user.save()
  
        return {success:true}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = removeFavourite