const Admin = require('../../models/adminModel')

const deleteAdmin = async (username) => {
    try{
        console.log(username)
        const deleted = await Admin.findOneAndDelete({username})

        if(!deleted){
            throw new Error('Delete error')
        }

        return {success:true}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}

module.exports = deleteAdmin