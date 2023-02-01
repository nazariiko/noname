const {Router} = require('express')
const adminController = require('../controllers/adminController')
const login = require('../services/adminServices/login')
const logout = require('../services/adminServices/logout')
const checkAuth = require('../middlewares/checkAuth')
const session = require('../services/adminServices/session')
const confirmPassword = require('../services/adminServices/confirmPassword')

const adminRouter =  Router()

adminRouter.post('/api/login',login)
adminRouter.post('/api/session',session)
adminRouter.post('/api/confirm',checkAuth,confirmPassword)
adminRouter.post('/api/logout',checkAuth,logout)
adminRouter.get('/api/admins',checkAuth,adminController)
adminRouter.post('/api/admin',checkAuth,adminController)
adminRouter.delete('/api/admin/:username',checkAuth,adminController)
adminRouter.put('/api/admin',checkAuth,adminController)

module.exports = adminRouter