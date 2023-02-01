const Header = require('../../models/headerModel')

const changeHeader = async (data) => {
    try{
        const header = await Header.find()

        if(!header.length){
            const created = await Header.create(data)
            return {success:true,header:created}
        }

        header[0].name = data.name
        header[0].link = data.link

        const result = await header[0].save()

        return {success:true,header}

    }catch(error){
        console.log(error)
        return {success:false,header:{}}
    }
}

module.exports = changeHeader