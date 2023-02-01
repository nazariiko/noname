const News = require('../../models/newsModel')

const getNews = async () => {
    try{
        const news = await News.find()

        return {success:!!news?.length,news}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = getNews