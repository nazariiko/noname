const Admin = require('../../models/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req,res) => {
    try{
        const {data} = req.body
        const admin = await Admin.findOne({username:data.username})

        if(!admin){
            throw new Error('Username or password is incorrect')
        }

        const isVerify = await bcrypt.compare(data.password,admin.password)
        
        if(isVerify){
            const token = jwt.sign(
                {username:admin.username,password:admin.password},process.env.SECRET_KEY,{expiresIn:'24h'}
            )
            return res.status(200).json({success:true,admin:{_id:admin._id,username:admin.username},token})
        }else{
            throw new Error('Username or password is incorrect')
        }

    }catch(error){
        console.log(error)
        return res.status(403).json({success:false,admin:{},error})
    }
}

module.exports = login