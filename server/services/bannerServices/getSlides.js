const Slide = require('../../models/slideModel')

const getSlides = async () => {
    try{
        const slides = await Slide.find()
        return {success:!!slides?.length,slides}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = getSlides