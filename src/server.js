import TelegramBot from 'node-telegram-bot-api'
import nodemailer from 'nodemailer'


const token = '5315396035:AAFR-pMPG78205PaXExcmN3iaDn0R2Qj190';

const bot = new TelegramBot(token, {polling: true});


// bot.on('polling_error', (error) => {
//     console.log(error.code);  // => 'EFATAL'
//     console.log(error.response.body);
// });





bot.on('message', (msg) => {

    const chatId = msg.chat.id;

    if (msg.text == "/start") {
        bot.sendMessage(msg.chat.id, "Salom botga xush kelibsiz! Raqamingizni jo'nating")
        return
    }
    if (msg.text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        bot.sendMessage(msg.chat.id, "e pochta to'g'ri")
    }else{
        bot.sendMessage(msg.chat.id, "Emailni noto'g'ri kiritdingiz")
    }


      
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: 'komiljon4717@gmail.com',
        pass: "kaxgoqqjqgartbpx",
        },
    });
    
    let mailer = message => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log("ok", info);
        });

    }

    mailer({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: "komiljonnosirov4717@gmail.com",
        subject: "Hello bashara✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    })


});

