const News = require('../../models/newsModel')
const writeFile = require('../../utils/writeFile')

const createNews = async (data,file) => {
    try{
        const img = file && writeFile(file)

        const createdNews = await News.create({...data,img:img})

        if(createdNews){
            return {success:true,news:createdNews}    
        }

        return {success:false}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}


module.exports = createNews