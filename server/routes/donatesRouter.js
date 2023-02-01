const {Router} = require('express')
const donatesController = require('../controllers/donatesController')
const checkAuth = require('../middlewares/checkAuth')

const donatesRouter = Router()

donatesRouter.post('/api/donate',checkAuth,donatesController)
donatesRouter.get('/api/donates',donatesController)
donatesRouter.get('/api/donate/:id',donatesController)
donatesRouter.put('/api/donate/:id',checkAuth,donatesController)
donatesRouter.patch('/api/donate/:id',checkAuth,donatesController)
donatesRouter.delete('/api/donate/:id',checkAuth,donatesController)

module.exports = donatesRouter