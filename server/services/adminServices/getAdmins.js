const Admin = require('../../models/adminModel')

const getAdmins = async () => {
    try{
        const admins = await Admin.find()

        if(!admins){
            throw new Error('Delete error')
        }

        const adminsWithoutPasswords = admins.map((admin) => {
            return {username:admin.username,_id:admin._id}
        })

        return {success:true,admins:adminsWithoutPasswords}
    }catch(error){
        console.log(error)
        return {success:false,error,admins:[]}
    }
}

module.exports = getAdmins