const jwt = require('jsonwebtoken')

const session = async (req,res) => {
    try{
        let token = req.headers.authorization
        
        if(!token){
            throw new Error('Auth error, please login again')
        }
        token = token.split(' ')[1]
        
        const jwtVerify = jwt.verify(token,process.env.SECRET_KEY,{json:true})
        
        if(jwtVerify){
            res.status(200).json({success:true,admin:{username:jwtVerify.username}})
        }else{
            throw new Error('Auth error, please login again')
        }

    }catch(error){
        console.log(error)
        return res.status(403).json({success:false,error})
    }
}

module.exports = session