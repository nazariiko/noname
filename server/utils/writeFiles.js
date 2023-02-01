const path = require('path')
const fs = require('fs')

const createUrl = (filename) => {
  return `${filename}`
}

const writeFiles = (files,data) => {
    const {investors,team,partners} = data
    for (const key in files) {
        const fileName = '/' + (Math.random(10) * 100000).toString() + '_' + files[key].originalFilename
        const oldPath = files[key].filepath;
        const rawData = fs.readFileSync(oldPath)
        fs.writeFile(path.join(__dirname,'uploads',fileName),rawData,(err) => {
          console.log(err)
          if(!err){
            console.log(fileName + ' uploaded')
          }
        })
        if(key.includes('description')){
            data.projectImg = createUrl(fileName)
        }
        if(key.includes('logo')){
            data.img = createUrl(fileName)
        }
  
        if(key.includes('investor')){
          const index = key.split('Img')[1]
          investors[index].img = createUrl(fileName)
        }
        if(key.includes('team')){
          const index = key.split('Img')[1]
          team[index].img = createUrl(fileName)
        }
        if(key.includes('partner')){
          const index = key.split('Img')[1]
          partners[index].img = createUrl(fileName)
        }
    }

    return {investors,team,partners,projectImg:data.projectImg,img:data.img}
}

module.exports = writeFiles