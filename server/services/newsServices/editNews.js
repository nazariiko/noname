const News = require('../../models/newsModel')
const writeFile = require('../../utils/writeFile')
const removeFiles = require('../../utils/removeFiles')

const editNews = async (id,data,file) => {
    try{
        const oldNewsVersion = await News.findOne({_id:id})

        if(file){
            removeFiles([{img:oldNewsVersion?.img}])
        }
        const img = file && writeFile(file)

        const editedNews = await News.findByIdAndUpdate({_id:id},{...data,img:img})

        if(editedNews){
            return {success:true,news:editedNews}    
        }

        return {success:false}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}


module.exports = editNews