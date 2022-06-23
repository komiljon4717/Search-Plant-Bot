

async function messageController (msg, bot, psql) {
    try {

        const chat_id = msg.chat.id
        const text = msg.text
        const first_name = msg.from.first_name
        const last_name =  msg.from.last_name

        const user = await psql.user.findOne({
            where: {
                chat_id: chat_id,
            }
        })

        if (!user) {
            await psql.user.create({
                chat_id: chat_id,
                first_name: first_name,
                last_name: last_name,
            })
            bot.sendMessage(chat_id, `Assalomu alaykum <b>${first_name} ${last_name}</b> SearchPlant botga xush kelibsiz! Botdan to'liq boydalinish uchun elektron pochtangizni bizga yuboring!`, {parse_mode: "HTML"})
        }
        else {
            bot.sendMessage(chat_id, "Siz botda eskisiz")
        }












        
        // const chatId = msg.chat.id;

        // if (msg.text == "/start") {
        //     const first_name = msg.from.first_name
        //     const last_name =  msg.from.last_name

        //     bot.sendMessage(chatId, `Assalomu alaykum <b>${first_name} ${last_name}</b> SearchPlant botga xush kelibsiz! Botdan to'liq boydalinish uchun elektron pochtangizni bizga yuboring!`, {parse_mode: "HTML"})
        //     return
        // }
        // if (msg.text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        //     sendMailer(msg.text)
        //     bot.sendMessage(msg.chat.id, "Sizning elektron pochtangizga tasdiqlash kodini jo'natdik. Kodni terib ro'yxatdan o'ting")
        //     console.log(process.code);
        // }else{
        //     bot.sendMessage(msg.chat.id, "Emailni noto'g'ri kiritdingiz")
        // }
    } catch (error) {
        console.log(error.message);
    }
}


export {
    messageController
}