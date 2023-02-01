const {Router} = require('express')
const authTelegramController = require('../controllers/authTelegramController')

const authTelegramRouter =  Router()

authTelegramRouter.post('/api/telegram-auth',authTelegramController)

module.exports = authTelegramRouter