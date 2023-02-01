const formidable = require('formidable')
const createNews = require('../services/newsServices/createNews')
const editNews = require('../services/newsServices/editNews')
const getNews = require('../services/newsServices/getNews')
const deleteNews = require('../services/newsServices/deleteNews')
const getNewsItem = require('../services/newsServices/getNewsItem')

const newsController = async (req,res) => {
    try{
        if(req.method === 'POST'){
            const data = await new Promise((resolve,reject) => {
                const form = formidable({multiples:true})
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err) 
                    }
                    resolve({fields,files}) 
                  });
              })

            const {success} = await createNews(JSON.parse(data.fields.data),data.files.img)

            if(success){
                return res.status(202).json({success:true})
            }
            res.status(500).json({success:false})
        }
        if(req.method === 'GET'){
            const {id} = req.params
            if(id){
                const {success,newsItem} = await getNewsItem(id)
                if(success){
                    return res.status(200).json({success,news:newsItem})
                }
                return res.status(404).json({success:false,news:[]})
            }

            const {success,news} = await getNews()
            if(success){
                return res.status(200).json({success,news})
            }
            return res.status(404).json({success:false,news:[]})
        }
        if(req.method === 'PUT'){
            const {id} = req.params
            const data = await new Promise((resolve,reject) => {
                const form = formidable({multiples:true})
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err) 
                    }
                    resolve({fields,files}) 
                  });
              })

            const {success} = await editNews(id,JSON.parse(data.fields.data),data.files.img)

            if(success){
                return res.status(202).json({success:true})
            }
            res.status(500).json({success:false})
        }
        if(req.method === 'DELETE'){
            const {id} = req.params
            const {success} = await deleteNews(id)
            
            if(success){
                return res.status(202).json({success:true})
            }

            res.status(500).json({success:false})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({success:true,error})
    }
}

module.exports = newsController