const {Router} = require('express')
const bannerController = require('../controllers/bannerController')
const checkAuth = require('../middlewares/checkAuth')

const bannerRouter =  Router()

bannerRouter.post('/api/banner',checkAuth,bannerController)
bannerRouter.get('/api/banner',bannerController)
bannerRouter.get('/api/banner/:id',bannerController)
bannerRouter.delete('/api/banner/:id',checkAuth,bannerController)
bannerRouter.put('/api/banner/:id',checkAuth,bannerController)

module.exports = bannerRouter