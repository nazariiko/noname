const {Schema,model} =  require('mongoose')

const newsSchema = new Schema({
    img: {type:String,unique:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    date:{type:String},
    recommendations:{type:Array}
})
    
module.exports = model('News',newsSchema)