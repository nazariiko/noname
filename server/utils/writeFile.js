const path = require('path')
const fs = require('fs')


const writeFile = (file) => {
        const fileName = '/' + (Math.random(10) * 100000).toString() + '_' + file.originalFilename
        const oldPath = file.filepath;
        const rawData = fs.readFileSync(oldPath)
        fs.writeFile(path.join(__dirname,'uploads',fileName),rawData,(err) => {
          console.log(err)
          if(!err){
            console.log(fileName + ' uploaded')
          }
        })
    return fileName
}

module.exports = writeFile