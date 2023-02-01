const News = require('../../models/newsModel')
const removeFiles = require('../../utils/removeFiles')

const deleteNews = async (id) => {
    try{
        const deleted = await News.findOne({_id:id})

        removeFiles([{img:deleted.img}])

        const result = await News.deleteOne({_id:id})

        return {success:!!result,news:deleted}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = deleteNews