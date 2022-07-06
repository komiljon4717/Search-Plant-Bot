import { setEmail, chackCode, notificationPic, mainMenuBtn, cancelBtn, gbif, gbifBtn } from "./functions.js"
import { find } from "../utils/checker.js"


async function messageController (msg, bot, psql) {
    try {

        const chat_id = msg.chat.id
        const text = msg.text.trim()
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
            bot.sendMessage(chat_id, `Assalomu alaykum ${first_name || ""} ${last_name || ""} Search Plant botga xush kelibsiz! Botdan to'liq boydalinish uchun elektron pochtangizni bizga yuboring!`)
        }
        else if (user.step == 1) {
            setEmail(text, bot, psql, user)
        }
        else if (user.step == 2 ) {
            chackCode(text, bot, psql, user)
        }
        else if (user.step == 3 && text == "🖼Rasm bilan qidirish" ) {
            notificationPic(bot, psql, user)
        }
        else if (user.step == 3 && text == "GBIF bilan qidirish" ) {
            gbifBtn(bot, user)
        }
        else if (user.step == 3 && text.match(/(GBIF: [0-9]{7})/) ) {
            gbif(text, bot, psql, user)
        }
        else if ( user.step == 3 && text == "📤Jo'natish" ) {
            find(bot, psql, user)
        }
        else if ( user.step == 3 && text == "Bekor qilish" ) {
            cancelBtn(bot, psql, user)
        }else if ( user.step == 3 && text == "Orqaga" ) {
            mainMenuBtn(text, bot, psql, user)
        }
        else {
            if (user.step == 3 || user.step == 3 && text == "/start") {
                mainMenuBtn(text, bot, psql, user)
            }else{
                await bot.sendMessage(chat_id, "Siz avval botdan ro'yxatdan o'tgansiz")
            }
        }
    } catch (error) {
        console.log("message controller");
        console.log(error.message);
    }
}


export {
    messageController
}