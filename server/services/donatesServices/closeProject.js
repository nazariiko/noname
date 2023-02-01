const Donate = require('../../models/donateModel')

const closeProject = async (id) => {
    try{
        const editedProject = await Donate.findById({_id:id})

        editedProject.isClosed = !editedProject.isClosed
        
        editedProject.save()
        
        return {success:true,project:editedProject}
    }catch(error){
        console.log(error)
        return {success:true,project:{},error}
    }
}

module.exports = closeProject