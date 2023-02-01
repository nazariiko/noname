const editCalendar = require('../services/calendarServices/editCalendar')
const getCalendar = require('../services/calendarServices/getCalendar')
const createCalendar = require('../services/calendarServices/createCalendar')
const deleteCalendar = require('../services/calendarServices/deleteCalendar')


const calendarController = async (req, res) => {
  try{
    if(req.method === 'GET'){
        const {success,calendar} = await getCalendar()
        if(success){
            return res.status(200).json({success:true,calendar})
        }
        return res.status(404).json({success:true,calendar:[]})
    }
    if(req.method === 'PUT'){
        const {id,data} = req.body
        const {success,calendar} = await editCalendar(id,data)
        if(success){
            return res.status(200).json({success:true,calendar})
        }
        return res.status(500).json({success:true,calendar:[]})
    }
    if(req.method === 'POST'){
      const data = req.body
      const {success,calendar} = await createCalendar(data)
      if(success){
          return res.status(200).json({success:true,calendar})
      }
      return res.status(500).json({success:true,calendar:[]})
    }
    if(req.method === 'DELETE'){
      const {id} = req.params
      const {success} = await deleteCalendar(id)
      if(success){
          return res.status(200).json({success:true})
      }
      return res.status(500).json({success:true})
  }
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,error})
  } 
}
  

module.exports = calendarController