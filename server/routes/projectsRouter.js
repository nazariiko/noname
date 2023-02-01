const {Router} = require('express')
const projectsController = require('../controllers/projectsController')
const checkAuth = require('../middlewares/checkAuth')

const projectsRouter = Router()

projectsRouter.post('/api/project',checkAuth,projectsController)
projectsRouter.get('/api/projects',projectsController)
projectsRouter.get('/api/project/:id',projectsController)
projectsRouter.put('/api/project/:id',checkAuth,projectsController)
projectsRouter.patch('/api/project/:id',checkAuth,projectsController)
projectsRouter.delete('/api/project/:id',checkAuth,projectsController)

module.exports = projectsRouter