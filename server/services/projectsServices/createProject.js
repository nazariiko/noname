const writeFiles = require('../../utils/writeFiles.js')
const Project = require('../../models/projectModel.js')

const createProject = async (data) => {
    try{
        const files = data.files
        let projectData = JSON.parse(data.fields.data)  
        const {investors,team,partners,projectImg,img} = writeFiles(files,projectData)
        projectData = {
          ...projectData,investors,team,partners,projectImg,img,
          dateStart:projectData.dates.from,
          dateEnd:projectData.dates.to
        }
        const newProject = await Project.create(projectData)
        
        return {success:true,newProject}
    }catch(error){
        console.log(error)
        return {success:false}
    }

}

module.exports = createProject