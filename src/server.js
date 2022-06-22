import  { sendMailer }  from './utils/sendmailer.js'
import TelegramBot from 'node-telegram-bot-api'
import  { find }  from './utils/checker.js'
import token from "./config.js"
import path from 'path';
import fs from 'fs';
import { database } from "./models/user/sequelize.js"
const psql = database()


const bot = new TelegramBot(token.TOKEN, {polling: true});

bot.on('message', (msg) => {
    try {
        
        const chatId = msg.chat.id;

        if (msg.text == "/start") {
            const first_name = msg.from.first_name
            const last_name =  msg.from.last_name

            bot.sendMessage(chatId, `Assalomu alaykum <b>${first_name} ${last_name}</b> SearchPlant botga xush kelibsiz! Botdan to'liq boydalinish uchun elektron pochtangizni bizga yuboring!`, {parse_mode: "HTML"})
            return
        }
        if (msg.text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            sendMailer(msg.text)
            bot.sendMessage(msg.chat.id, "Sizning elektron pochtangizga tasdiqlash kodini jo'natdik. Kodni terib ro'yxatdan o'ting")
            console.log(process.code);
        }else{
            bot.sendMessage(msg.chat.id, "Emailni noto'g'ri kiritdingiz")
        }
    } catch (error) {
        console.log(error.message);
        // fs.WriteFileSync(path.join(process.swd() + '/log.txt'))
    }


    


      
    


});

