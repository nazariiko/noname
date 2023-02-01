const {Router} = require('express')
const authController = require('../controllers/authController')

const authRouter =  Router()

authRouter.post('/api/auth',authController)

module.exports = authRouter