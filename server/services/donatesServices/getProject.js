const Donate = require('../../models/donateModel')

const getProject = async (id) => {
  try{
    const project = await Donate.findOne({_id:id})
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