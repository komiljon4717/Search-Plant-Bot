import  { codeGenerator }  from './codeGenerator.js'
import nodemailer from 'nodemailer'
import config from '../config.js'
import fs from 'fs'

const myEmail = config.emailaddress

function sendMailer(email) {
    try {
        const code = codeGenerator()
        process.code = code

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: myEmail,
            pass: config.pass,
            }
        });
        
        let mailer = message => {
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                // console.log("ok", info);
            });

        }

        mailer({
            from: myEmail,
            to: email,
            subject: "Hello",
            text: "Verification code",
            html: "<b>Verification code:</b>" + code,
        })
    } catch (error) {
        console.log(error.message);
    }
    
}

export {
    sendMailer
}