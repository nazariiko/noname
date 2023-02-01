const Project = require('../../models/projectModel')

const closeProject = async (id) => {
    try{
        const editedProject = await Project.findById({_id:id})

        editedProject.isClosed = !editedProject.isClosed
        
        editedProject.save()
        
        return {success:true,project:editedProject}
    }catch(error){
        console.log(error)
        return {success:true,project:{},error}
    }
}

module.exports = closeProject