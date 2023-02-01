import {config} from '../config/api.js'

export default async (userData) => {
  try{
      const response = await fetch(config.createUrl('telegram-auth'),{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(userData)
      })
      const {success} = await response.json()

      return {success}

  }catch(error){
      console.log(error)
      return {succes:false,error}
  }
}