const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const connectDb = require('./db')
const projectsRouter = require('./routes/projectsRouter')
const donatesRouter = require('./routes/donatesRouter')
const communityRouter = require('./routes/communityRouter')
const waitingListRouter = require('./routes/waitingListRouter')
const authRouter = require('./routes/authRouter')
const newsRouter = require('./routes/newsRouter')
const calendarRouter = require('./routes/calendarRouter')
const bannerRouter = require('./routes/bannerRouter')
const headerRouter = require('./routes/headerRouter')
const footerRouter = require('./routes/footerRouter')
const adminRouter = require('./routes/adminRouter')
const authTelegramRouter = require('./routes/authTelegramRouter')
const path = require('path')

const PORT = process.env.PORT || 5000

connectDb()

app.use(cookieParser(process.env.COOKIE_KEY))

app.use(cors({credentials:true,origin:true}))

app.use(express.json())

app.use('/api/static', express.static(path.join(__dirname,'utils','uploads')))

app.use(projectsRouter)

app.use(donatesRouter)

app.use(communityRouter)

app.use(waitingListRouter)

app.use(authRouter)

app.use(newsRouter)

app.use(calendarRouter)

app.use(bannerRouter)

app.use(headerRouter)

app.use(footerRouter)

app.use(authTelegramRouter)

app.use(adminRouter)

app.listen(PORT,() => {
    console.log('server started on port ' + PORT)
})