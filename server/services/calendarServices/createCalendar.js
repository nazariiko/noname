const Calendar = require('../../models/calendarModel')

const createCalendar = async (data) => {
    try{
        const result = await Calendar.create({...data})
       
        return {success:true,calendar:result}
    }catch(error){
        console.log(error)
        return {success:false,calendar:{},error}
    }
}

module.exports = createCalendar