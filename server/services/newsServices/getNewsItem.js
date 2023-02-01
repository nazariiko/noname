const News = require('../../models/newsModel')

const getNewsItem = async (id) => {
    try{
        const newsItem = await News.findOne({_id:id})

        const recommendations = []

        for (let index = 0; index < newsItem.recommendations.length; index++) {
            const finded = await News.findOne({_id:newsItem.recommendations[index]})
            recommendations.push(finded)
            
        }

        const news = {
            _id:newsItem._id,
            title:newsItem.title,
            description:newsItem.description,
            date:newsItem.date,
            img:newsItem.img,
            recommendations
        }

        return {success:!!newsItem,newsItem:news}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = getNewsItem