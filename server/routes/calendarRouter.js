const {Router} = require('express')
const calendarController = require('../controllers/calendarController')
const checkAuth = require('../middlewares/checkAuth')

const calendarRouter =  Router()

calendarRouter.post('/api/calendar',checkAuth,calendarController)
calendarRouter.get('/api/calendar',calendarController)
calendarRouter.delete('/api/calendar/:id',checkAuth,calendarController)
calendarRouter.put('/api/calendar',checkAuth,calendarController)

module.exports = calendarRouter