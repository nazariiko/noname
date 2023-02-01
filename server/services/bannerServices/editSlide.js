const Slide = require('../../models/slideModel')
const writeFile = require('../../utils/writeFile')
const removeFiles = require('../../utils/removeFiles')

const editSlide = async (id,data,file) => {
    try{
        const oldSlideVersion = await Slide.findOne({_id:id})
        let img;
        if(!!file){
            removeFiles([{img:oldSlideVersion.img}])
            img = writeFile(file)
        }
        const newSlideVersion = {
            title:data.title,
            description:data.description,
            date:data.date,
            link:data.link,
            img: img ? img : oldSlideVersion.img,
            timeStart:data.timeStart
        }

        const editedSlide = await Slide.findByIdAndUpdate({_id:id},newSlideVersion)
        
        if(!editedSlide){
            return {success:false}
        }
        
        return {success:true,slide:editedSlide}    

    }catch(error){
        console.log(error)
        return {success:false}
    }
}


module.exports = editSlide


