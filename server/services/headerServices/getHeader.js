const Header = require('../../models/headerModel')

const getHeader = async () => {
    try{
        const header = await Header.find()

        return {success:true,header}

    }catch(error){
        console.log(error)
        return {success:false,header:null}
    }
}

module.exports = getHeader