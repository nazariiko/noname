const {Router} = require('express')
const newsController = require('../controllers/newsController')
const checkAuth = require('../middlewares/checkAuth')

const newsRouter = Router()

newsRouter.get('/api/news',newsController)
newsRouter.get('/api/news/:id',newsController)
newsRouter.put('/api/news/:id',checkAuth,newsController)
newsRouter.delete('/api/news/:id',checkAuth,newsController)
newsRouter.post('/api/news',checkAuth,newsController)

module.exports = newsRouter