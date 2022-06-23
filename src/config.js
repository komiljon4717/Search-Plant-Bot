import dotenv from 'dotenv'
dotenv.config()

const { env } = process

export default {
    TOKEN: env.TOKEN,
    POSTGRES: env.POSTGRES,
    emailaddress: env.MYEMAIL,
    pass: env.EMAIL_PASS
    
}