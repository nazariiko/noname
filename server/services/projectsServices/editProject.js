const Project = require('../../models/projectModel')
const removeFiles = require('../../utils/removeFiles')
const writeFiles = require('../../utils/writeFiles')

const editProject = async (id,data) => {
    try{
        if(data.fields?.oldFiles){
            const filesToRemove = JSON.parse(data.fields.oldFiles).filter((item) => item.remove)
            const {success} = await removeFiles(filesToRemove)
        }
        const files = data.files
        let projectData = JSON.parse(data.fields.data)  
        const {investors,team,partners,projectImg,img} = writeFiles(files,projectData)
        projectData = {
          ...projectData,investors,team,partners,projectImg,img,
          dateStart:projectData.dates.from,
          dateEnd:projectData.dates.to
        }

        const editedProject = await Project.findByIdAndUpdate({_id:id},{
            ...projectData
        })
        
        return {success:true,project:editedProject}
    }catch(error){
        console.log(error)
        return {success:true,project:{},error}
    }
}

module.exports = editProject