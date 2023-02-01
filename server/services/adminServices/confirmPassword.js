const bcrypt = require('bcrypt')
const Admin = require('../../models/adminModel')

const confirmPassword = async (req,res) => {
    try{
        const {username,password} = req.body
        const admin = await Admin.findOne({username})

        const isVerify = await bcrypt.compare(password,admin.password)

        if(!isVerify){
            throw new Error("Confirm error")
        }

        return res.status(200).json({success:true})
    }catch(error){
        console.log(error)
        return res.status(403).json({success:false,error})
    }
}

module.exports = confirmPassword