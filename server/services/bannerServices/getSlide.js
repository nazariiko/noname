const Slide = require('../../models/slideModel')

const getSlide = async (id) => {
    try{
        const slide = await Slide.findOne({_id:id})
        return {success:!!slide,slide}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = getSlide