const formidable = require('formidable')
const nodemailer = require('nodemailer')

const sendMail = async (req,res) => {
    try{
        const data = await new Promise((resolve,reject) => {
            const form = formidable({multiples:true})

            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err) 
                }
                resolve({fields,files})
              });
        })
        
        const {email,telegram} = data.fields
        const file = data.files

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })

        const mailOptions = {
            form:process.env.EMAIL,
            to:process.env.EMAIL,
            subject:'Noname new form message',
            text:`Email: ${email},telegram: ${telegram}`,
        }

        if(file.hasOwnProperty('customFile')){
            mailOptions.attachments = [
                {filename:file.customFile.originalFilename,path:file.customFile.filepath}
            ]
        }

        transporter.sendMail(mailOptions,(error) => {
            if(!error){
                throw new Error(error)
            }
        })
    
        return {success:true}
    }catch(error){
        console.log(error)
        return {success:false}
    }
}

module.exports = sendMail