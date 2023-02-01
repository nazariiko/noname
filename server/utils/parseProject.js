const parseProject = (project) => {
    const files = [{img:project?.img},{img:project?.projectImg}]
    
    const data = [...project.investors,...project.team,...project.partners]
    files.push(...data.map((item) => {
        return {img:item?.img}
    }))

    return files
}

module.exports = parseProject