const {Schema,model} = require('mongoose') 

const projectSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    dates:{type:Object,required:false},
    status:{type:String,required:true},
    field:{type:String,required:false},
    goal:{type:String,required:false},
    type:{type:String,required:false},
    rating:{type:Number,required:false},
    isClosed:{type:Boolean,required:false},
    path:{type:String,required:false},
    funded:{type:String,required:false},
    descriptionFull:{type:String,required:false},
    lastFunding:{type:String,required:false},
    socialmedia:{type:Array,required:false},
    team:{type:Array,required:false},
    investors:{type:Array,required:false},
    partners:{type:Array,required:false},
    img:{type:String,required:false},
    projectImg:{type:String,required:false},
    dateStart:{type:String,required:true},
    dateEnd:{type:String,required:true},
    links:{type:Array},
    timeStart:{type:String},
    timeEnd:{type:String}
})
    
module.exports =  model('Project',projectSchema)