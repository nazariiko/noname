const {Schema,model} =  require('mongoose')

const userSchema = new Schema({
    address: {type:String,required:true,unique:true},
    balance:{type:String,required:true},
    favourites:{type:Array,required:true,default:[]}
})
    
module.exports = model('User',userSchema)