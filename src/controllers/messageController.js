import { sendMailer } from '../utils/sendmailer.js'
let res = null




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
        else if (user.step == 1) {
            await setEmail(text, bot, psql, user)
        }
        else if (user.step == 2) {
            await chackCode(text, bot, psql, user)
        }
        else {
            bot.sendMessage(chat_id, "Siz avval botdan ro'yxatdan o'tgansiz")
        }
        


        async function setEmail (text, bot, psql, user) {
            try {
                if (text.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                    await psql.user.update({
                        step: 2,
                        email: text
                    }, {
                        where: {
                            chat_id: user.chat_id
                        }
                    })
                    sendMailer(text)

                    res = await bot.sendMessage(user.chat_id, `Sizning ${text} manzilingizga tasdiqlash kodi yuborildi. Kodni kiriting`, {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: [
                                [
                                    {
                                        text: "Boshqa emailga jo'natish",
                                    }
                                ]
                            ]
                        }
                    })
                } else {
                    bot.sendMessage(user.chat_id, "Noto'g'ri email address kiritdingiz. Iltimos qaytadan kiriting")
                }
            } catch (error) {
                if (error.message == "Validation error") {
                    bot.sendMessage(user.chat_id, `${text} bu emaildan allaqachon foydalanilgan. boshqa emaildan foydalaning`)
                }
                console.log(error.message);
            }
        }


        async function chackCode (text, bot, psql, user) {
            if (text == process.code) {
                await psql.user.update({
                    step: 3
                }, {
                    where: {
                        chat_id: user.chat_id
                    }
                })

                bot.sendMessage(user.chat_id, "Siz muvaffaqiyatli ro'yxatdan o'tdingiz. Siz endi bizning xizmatlardan bemalol fodalanishingiz mumkin", {
                    reply_markup: {
                        remove_keyboard: true
                    }
                })
            }
            else if(text == "Boshqa emailga jo'natish") {
                await back(bot, psql, user)
            }
            else {
                console.log(text);
                bot.sendMessage(user.chat_id, "Siz noto'g'ri kod kiritdingiz iltimos qaytadan kiriting")
            }
        }

        async function back (bot, psql, user) {
            await psql.user.update({
                step: 1,
                email: null
            }, {
                where: {
                    chat_id: user.chat_id
                }
            })

            bot.sendMessage(user.chat_id, "Qaytadan emailingizni jo'nating", {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        }

       
    } catch (error) {
        console.log("dang", error.message);
    }
}


export {
    messageController
}