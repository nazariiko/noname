const Calendar = require('../../models/calendarModel')

const getCalendar = async () => {
    try{
        const calendar = await Calendar.find()
        
        if(calendar){
            return {success:true,calendar}
        }
        return {success:false,calendar}

    }catch(error){
        console.log(error)
        return {success:false,project:{},error}
    }
}

module.exports = getCalendar