const getHeader = require('../services/headerServices/getHeader')
const changeHeader = require('../services/headerServices/changeHeader')

const headerController = async (req,res) => {
    try{
        if(req.method === 'GET'){
            const {success,header} = await getHeader()
            if(!success){
                throw new Error('Something went wrong')
            }
            res.status(200).json({success:true,header})
        }
        if(req.method === 'POST'){
            const data = req.body
            const {success} = await changeHeader(data)
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

module.exports = headerController