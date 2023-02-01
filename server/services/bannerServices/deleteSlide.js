const Slide = require('../../models/slideModel')
const removeFiles = require('../../utils/removeFiles')

const deleteSlide = async (id) => {
    try{
        const deleted = await Slide.findByIdAndDelete({_id:id})

        removeFiles([{img:deleted.img}])

        return {success:true}    

    }catch(error){
        console.log(error)
        return {success:false}
    }
}


module.exports = deleteSlide