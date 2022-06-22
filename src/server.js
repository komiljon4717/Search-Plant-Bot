import TelegramBot from 'node-telegram-bot-api'
import  { find }  from '../utils/checker.js'
import  { sendMailer }  from '../utils/sendmailer.js'
import fs from 'fs';
import path from 'path';

const token = '5315396035:AAFR-pMPG78205PaXExcmN3iaDn0R2Qj190';

const bot = new TelegramBot(token, {polling: true});


// bot.on('polling_error', (error) => {
//     console.log(error.code);  // => 'EFATAL'
//     console.log(error.response.body);
// });





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
            bot.sendMessage(msg.chat.id, "e pochta to'g'ri")
            sendMailer(msg.text)
            console.log(process.code);
        }else{
            bot.sendMessage(msg.chat.id, "Emailni noto'g'ri kiritdingiz")
        }
    } catch (error) {
        fs.WriteFileSync(path.join(process.swd() + '/log.txt'))
    }


    


      
    


});

