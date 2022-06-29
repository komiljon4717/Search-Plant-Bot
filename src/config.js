import dotenv from 'dotenv'
dotenv.config()


const { env } = process
process.pictures = []
process.organs = []

export default {
    TOKEN: env.TOKEN,
    POSTGRES: env.POSTGRES,
    emailaddress: env.MYEMAIL,
    pass: env.EMAIL_PASS,
    API_KEY: env.API_KEY,
    
}