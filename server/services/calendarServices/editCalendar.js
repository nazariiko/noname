const Calendar = require('../../models/calendarModel')

const editProject = async (id,data) => {
    try{
        const result = await Calendar.findOneAndUpdate({_id:id},{...data})
       
        return {success:true,calendar:result}
    }catch(error){
        console.log(error)
        return {success:false,calendar:{},error}
    }
}

module.exports = editProject