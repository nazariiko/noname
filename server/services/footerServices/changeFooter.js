const Footer = require('../../models/footerModel')

const changeFooter = async (data) => {
    try{
        const footer = await Footer.find()

        if(!footer.length){
            const created = await Footer.create(data)
            return {success:true,footer:created}
        }

        footer[0].socialmedia = data.socialmedia
        footer[0].links = data.links
        footer[0].discordLink = data.discordLink

        const result = await footer[0].save()

        return {success:true,footer:result}

    }catch(error){
        console.log(error)
        return {success:false,footer:{}}
    }
}

module.exports = changeFooter