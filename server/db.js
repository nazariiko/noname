require('dotenv').config()
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI

connectDb = () => {
    mongoose.set('strictQuery',true)
    mongoose.connect(DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((res) => console.log('Connected to db'))
}

module.exports = connectDb