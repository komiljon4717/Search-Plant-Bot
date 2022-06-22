import nodemailer from 'nodemailer'
import  { codeGenerator }  from './codeGenerator.js'
import fs from 'fs'


function sendMailer(email) {
    try {
        const code = codeGenerator()
        process.code = code

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: 'komiljon4717@gmail.com',
            pass: "kaxgoqqjqgartbpx",
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
            from: 'komiljon4717@gmail.com',
            to: email,
            subject: "Hello bashara✔",
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