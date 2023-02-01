const {Schema,model} =  require('mongoose')

const calendarSchema = new Schema({
    localid:{type:Number,required:true},
    date:{type:String,required:true},
    projects:{type:Array}
})
    
module.exports = model('Calendar',calendarSchema)