const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt')

const editAdmin = async (data) => {
    try{
        const candidate = await Admin.findOne({username:data.username})
        
        const verify = await bcrypt.compare(data.oldPassword,candidate.password)

        if(!verify){
            throw new Error('Verify error')
        }

        const newPassword = await bcrypt.hash(data.newPassword,Number(process.env.SALT))

        const edited = await Admin.findOneAndUpdate({username:data.username},{password:newPassword})

        if(!edited){
            throw new Error('Edit error')
        }

        return {success:true,admin:{_id:edited._id,username:edited.username}}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}

module.exports = editAdmin