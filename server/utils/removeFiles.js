const path = require('path')
const fs = require('fs')

const removeFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
        if(!files[i].img){
            continue
        }
        
        fs.unlink(path.join(__dirname,'uploads',files[i].img),(err) => {
            if(err){
                return {success:false}
            }else{
                console.log('removed ' + files[i].img)
            }
        })
    }
    return {success:true}
}

module.exports = removeFiles