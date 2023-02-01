import {config} from '../../../config/api'
import getToken from '../../../utils/getToken'

export default async (data) => {
    try{
        const token = getToken()

        const responce = await fetch(config.createUrl('header'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })

        const {success} = await responce.json()

        return {success}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}