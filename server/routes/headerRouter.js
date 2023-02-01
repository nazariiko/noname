const {Router} = require('express')
const headerController = require('../controllers/headerController')
const checkAuth = require('../middlewares/checkAuth')

const headerRouter = Router()

headerRouter.get('/api/header',headerController)
headerRouter.post('/api/header',checkAuth,headerController)

module.exports = headerRouter