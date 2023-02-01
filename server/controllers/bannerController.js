const createSlide = require('../services/bannerServices/createSlide')
const getSlides = require('../services/bannerServices/getSlides')
const getSlide = require('../services/bannerServices/getSlide')
const editSlide = require('../services/bannerServices/editSlide')
const deleteSlide = require('../services/bannerServices/deleteSlide')
const formidable = require('formidable')

const bannerController = async (req, res) => {
  try{
    if(req.method === 'GET'){
      const {id} = req.params

      if(id){
        const {success,slide} = await getSlide(id)

        if(success){
          return res.status(200).json({success,slide})
        }

        return res.status(404).json({success:false,slide:{}})
      }

      const {success,slides} = await getSlides()
      if(success){
        return res.status(200).json({success,slides})
      }
      return res.status(404).json({success:false,slides:[]})
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
      const {success} = await editSlide(id,JSON.parse(data.fields.data),data.files.img)

      if(success){
        return res.status(200).json({success})
      }

      return res.status(500).json({success:false})
    }

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
      const {success} = await createSlide(JSON.parse(data.fields.data),data.files.img)

      if(success){
          return res.status(202).json({success:true})
      }
      res.status(500).json({success:false})
    }

    if(req.method === 'DELETE'){
      const {id} = req.params
      const {success} = await deleteSlide(id)
      if(success){
        return res.status(200).json({success})
      }

      return res.status(500).json({success:false})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,error})
  } 
}
  

module.exports = bannerController