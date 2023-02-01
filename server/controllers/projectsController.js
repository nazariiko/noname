const formidable = require('formidable')
const createProject = require('../services/projectsServices/createProject')
const getProjects = require('../services/projectsServices/getProjects')
const getProject = require('../services/projectsServices/getProject')
const editProject = require('../services/projectsServices/editProject')
const deleteProject = require('../services/projectsServices/deleteProject')
const closeProject = require('../services/projectsServices/closeProject')

connectDb()

const projectsController = async (req, res) => {
  try{
    if(req.method === 'POST'){
      const data = await new Promise((resolve,reject) => {
        const form = formidable(
        {multiples:true,
       
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err) 
            }
            resolve({fields,files}) 
          });
      })

      const {success} = await createProject(data)
    
      if(!success){
        throw new Error('Something going wrong...')
      }
      return res.status(200).json({success:true})
    }
    if(req.method === 'GET'){
      const {id} = req.params
      if(id){
        const {success,project} = await getProject(id)
        return res.status(200).json({success,project})
      }
      const {success,projects} = await getProjects()
      return res.status(200).json({success,projects})
    }
    if(req.method === 'PUT'){
      const {id} = req.params
      const data = await new Promise((resolve,reject) => {
        const form = formidable(
        {multiples:true,
       
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err) 
            }
            resolve({fields,files}) 
          });
      })
      const {success,project} = await editProject(id,data)
      return res.status(200).json({success,project})
    }
    if(req.method === 'DELETE'){
      const {id} = req.params
      const {success,project} = await deleteProject(id)
      return res.status(200).json({success,project})
    }
    if(req.method === 'PATCH'){
      const {id} = req.params
      const {success,project} = await closeProject(id)
      return res.status(200).json({success,project})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,error})
  } 
   
}
  

module.exports = projectsController