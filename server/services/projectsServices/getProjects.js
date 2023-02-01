const Project = require('../../models/projectModel.js')

const getProjects = async () => {
  try{
    const projects = await Project.find()

    const allProjects = [
      {
        name:'Active',
        projects:projects.filter((project) => {
          return project.status === 'Active'
        }),
      },
      {
        name:'Upcoming',
        projects:projects.filter((project) => {
          return project.status === 'Upcoming'
        }),
      },
      {
        name:'Ended',
        projects:projects.filter((project) => {
          return project.status === 'Ended'
        }),
      }
    ]

    return {success:true,projects:allProjects}
  }catch(error){
    console.log(error)
    return {success:false,error,projects:[]}
  } 
}

module.exports = getProjects