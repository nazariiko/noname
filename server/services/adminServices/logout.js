const Admin = require('../../models/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const logout = async (req,res) => {
    try{
        res.clearCookie('token')
        return res.status(200).json({success:true})
    }catch(error){
        console.log(error)
        return res.status(403).json({success:false,error})
    }
}

module.exports = logout