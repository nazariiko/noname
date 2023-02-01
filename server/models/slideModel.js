const {Schema,model} =  require('mongoose')

const slideSchema = new Schema({
    title:{type:String,required:true,default:'Empty'},
    description:{type:String,required:true,default:'Empty'},
    link:{type:String,required:true,default:'Empty'},
    date:{type:String,required:true},
    img:{type:String,required:true,default:'Empty'},
    timeStart:{type:String}
})
    
module.exports = model('Slide',slideSchema)