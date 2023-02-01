const {Schema,model} =  require('mongoose')

const headerSchema = new Schema({
    name: {type:String,default:''},
    link: {type:String,default:''},
})
    
module.exports = model('Header',headerSchema)