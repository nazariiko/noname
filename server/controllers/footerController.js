const getFooter = require('../services/footerServices/getFooter')
const changeFooter = require('../services/footerServices/changeFooter')

const footerController = async (req,res) => {
    try{
        if(req.method === 'GET'){
            const {success,footer} = await getFooter()
            if(!success){
                throw new Error('Something went wrong')
            }
            res.status(200).json({success:true,footer})
        }
        if(req.method === 'POST'){
            const data = req.body
            const {success} = await changeFooter(data)
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

module.exports = footerController