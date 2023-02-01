const User = require('../models/userModel')

const addFavourite = async (req) => {
    try{
        const {id,address} = req.body

        const user = await User.findOne({address})

        if(user?.favourites){
            user.favourites = [...user.favourites,id]

            const result = await user.save()
            
            return {success:true,user:result}
        }

        user.favourites = [id]

        await user.save()
  
        return {success:true}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = addFavourite