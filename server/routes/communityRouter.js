const {Router} = require('express')
const communityController = require('../controllers/communityController')

const communityRouter = Router()

communityRouter.post('/api/community',communityController)

module.exports = communityRouter