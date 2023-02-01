const jwt = require('jsonwebtoken')

const checkAuth = async (req,res,next) => {
    try{
        let token = req.headers.authorization
        
        if(!token){
            throw new Error('Auth error, please login again')
        }
        token = token.split(' ')[1]
        
        const jwtVerify = jwt.verify(token,process.env.SECRET_KEY,{json:true})
        
        if(jwtVerify){
            next()
        }else{
            throw new Error('Auth error, username or password is incorrect')
        }

    }catch(error){
        console.log(error)
        return res.status(403).json({success:false,error})
    }
}

module.exports = checkAuth