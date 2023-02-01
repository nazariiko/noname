const addFavourite = require('../services/addFavourite.js')
const removeFavourite = require('../services/removeFavourite.js')

const waitingListController = async (req,res) => {
    try{
        if(req.method === 'POST'){
            const {success} = await addFavourite(req)
            if(!success){
                throw new Error('Something went wrong')
            }
            res.status(200).json({success:true})
        }
        if(req.method === 'DELETE'){
            const {success} = await removeFavourite(req)
            if(!success){
                throw new Error('Something went wrong')
            }
            res.status(200).json({success:true})
        }

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,error})
    }
}

module.exports = waitingListController