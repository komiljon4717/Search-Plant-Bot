import { setEmail, chackCode, notificationPic } from "./functions.js"


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
            bot.sendMessage(chat_id, `Assalomu alaykum <b>${first_name} ${last_name} <i>Search Plant</i></b> botga xush kelibsiz! Botdan to'liq boydalinish uchun elektron pochtangizni bizga yuboring!`, {parse_mode: "HTML"})
        }
        else if (user.step == 1) {
            await setEmail(text, bot, psql, user)
        }
        else if (user.step == 2) {
            await chackCode(text, bot, psql, user)
        }
        else if (user.step == 3 && text == "🖼 bilan qidirish") {
            await notificationPic(bot, psql, user)
        }
        else {
            await bot.sendMessage(chat_id, "Siz avval botdan ro'yxatdan o'tgansiz")
        }
    } catch (error) {
        console.log("dang", error.message);
    }
}


export {
    messageController
}