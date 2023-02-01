const Footer = require('../../models/footerModel')

const getFooter = async () => {
    try{
        const footer = await Footer.find()
        
        if(!footer.length){
            return {success:false,footer:null}
        }

        return {success:true,footer}

    }catch(error){
        console.log(error)
        return {success:false,footer:null}
    }
}

module.exports = getFooter