const createAdmin = require('../services/adminServices/createAdmin')
const deleteAdmin = require('../services/adminServices/deleteAdmin')
const editAdmin = require('../services/adminServices/editAdmin')
const getAdmins = require('../services/adminServices/getAdmins')

const adminController = async (req,res) => {
    try{
        if(req.method === 'GET'){
            const {success,admins} = await getAdmins()
            
            return res.status(200).json({success,admins})
        }
        if(req.method === 'POST'){
            const {data} = req.body
            const {success,admin} = await createAdmin(data)

            return res.status(202).json({success,admin})
        }
        if(req.method === 'DELETE'){
            const {username} = req.params
            const {success,error} = await deleteAdmin(username)
            if(!success){
                throw new Error(error)
            }
            return res.status(200).json({success})
        }
        if(req.method === 'PUT'){
            const data = req.body
            const {success,admin,error} = await editAdmin(data)
            if(!success){
                throw new Error(error)
            }
            return res.status(200).json({success,admin})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,error,admin:{}})
    }
}

module.exports = adminController