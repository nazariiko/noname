const Calendar = require('../../models/calendarModel')

const deleteCalendar = async (id) => {
    try{
        const calendar = await Calendar.deleteOne({_id:id})

        return {success:true}

    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = deleteCalendar