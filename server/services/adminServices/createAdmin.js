const Admin = require('../../models/adminModel')
const bcrypt = require('bcrypt')

const createAdmin = async (adminData) => {
    try{
        const candidate = await Admin.findOne({username:adminData.username})

        if(candidate){
            throw new Error('Admin with this name exist')
        }

        const passwordHash = await bcrypt.hash(adminData.password,Number(process.env.SALT))
        
        const newAdmin = await Admin.create({username:adminData.username,password:passwordHash})

        if(!newAdmin){
            return {success:false,admin:{}}
        }

        return {success:true,admin:{_id:newAdmin._id,username:newAdmin.username}}
    }catch(error){
        console.log(error)
        return {success:false,admin:{},error}
    }
}

module.exports = createAdmin