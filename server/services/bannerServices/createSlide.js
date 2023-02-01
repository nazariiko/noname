const Slide = require('../../models/slideModel')
const writeFile = require('../../utils/writeFile')

const createSlide = async (data,file) => {
    try{
        const img = file && writeFile(file)

        const createdSlide = await Slide.create({...data,img:img})
        
        if(!createdSlide){
            return {success:false}
        }

        return {success:true,slide:createdSlide}    

    }catch(error){
        console.log(error)
        return {success:false}
    }
}


module.exports = createSlide