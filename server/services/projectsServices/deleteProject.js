const Project = require('../../models/projectModel')
const removeFiles = require('../../utils/removeFiles')
const parseProject = require('../../utils/parseProject')

const deleteProject = async (id) => {
    try{
        const findedProject = await Project.findOne({_id:id})
        if(!findedProject){
            return {success:false}
        }
        const files = parseProject(findedProject)

        files.length && removeFiles(files)
        
        await Project.deleteOne({_id:id})

        return {success:true,error:''}
    }catch(error){
        console.log(error)
        return {success:false,error}
    }
}

module.exports = deleteProject