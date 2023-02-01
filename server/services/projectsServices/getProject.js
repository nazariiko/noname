const Project = require('../../models/projectModel.js')

const getProject = async (id) => {
  try{
    const project = await Project.findOne({_id:id})

    if(project){
      return {success:true,project}
    }
    return {success:false,project}
    
  }catch(error){
    console.log(error)
    return {success:false,error,project:{}}
  } 
}

module.exports = getProject