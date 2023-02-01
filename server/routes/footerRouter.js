const {Router} = require('express')
const footerController = require('../controllers/footerController')
const checkAuth = require('../middlewares/checkAuth')

const footerRouter = Router()

footerRouter.get('/api/footer',footerController)
footerRouter.post('/api/footer',checkAuth,footerController)

module.exports = footerRouter