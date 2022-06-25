import { sendMailer } from '../utils/sendmailer.js'



// ------------------------------------------------------

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

            await bot.sendMessage(user.chat_id, `Sizning ${text} manzilingizga tasdiqlash kodi yuborildi. Kodni kiriting`, {
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
            bot.sendMessage(user.chat_id, `${text} bu emaildan allaqachon foydalanilgan. Boshqa emaildan foydalaning`)
        }
        console.log(error.message);
    }
}

// ------------------------------------------------

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
                remove_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "🖼 bilan qidirish",
                        },
                        {
                            text: "Wikipediadan qidirish",
                        }
                    ],
                    [
                        {
                            text: "Mening rasmlarim"
                        }
                    ]
                ]
            }
        })
    }
    else if(text == "Boshqa emailga jo'natish") {
        await back(bot, psql, user)
    }
    else {
        bot.sendMessage(user.chat_id, "Siz noto'g'ri kod kiritdingiz iltimos qaytadan kiriting")
    }
}

// ------------------------------------------------------

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

// ==========================================================================


async function notificationPic (bot, psql, user) {
    bot.sendMessage(user.chat_id, "Bitta so'rovda 1 tadan 5 tagacha rasm yuborish mimkin. Kichik tomoni 600px dan kattaroq va 2000px dan kichikroq tasvirlardan foydalanishni tavsiya qilamiz. Ideal holatda, 1280x1280 piksel bo'ladi. Ko'rsatilgan piksellardan past rasmlarni aniqlanish darajasi past bo'ladi", {
        reply_markup: {
            remove_keyboard: true,
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: "🌿leaf => barg"
                    },
                    {
                        text:"🌸flower => gul"
                    },
                ],
                [
                    {
                        text: "🍏fruit => meva"
                    },
                    {
                        text: "root => ildiz"
                    }
                ],
                [
                    {
                        text: "Jo'natish"
                    }
                ]
            ]
        }
    })
}







export {
    setEmail,
    chackCode,
    notificationPic
}