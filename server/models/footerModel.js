const {Schema,model} =  require('mongoose')

const footerSchema = new Schema({
    links:{type:Array,default:[]},
    socialmedia:{type:Array,default:[]},
    discordLink:{type:String}
})
    
module.exports = model('Footer',footerSchema)