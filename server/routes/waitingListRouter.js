const {Router} = require('express')
const waitingListController = require('../controllers/waitingListController')

const waitingListRouter = Router()

waitingListRouter.delete('/api/favourite',waitingListController)
waitingListRouter.post('/api/favourites',waitingListController)

module.exports = waitingListRouter