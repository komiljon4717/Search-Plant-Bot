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

        mainMenuBtn(text, bot, psql, user)
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
                        text: "auto => auto"
                    }
                ],
                [
                    {
                        text: "📤Jo'natish"
                    },
                    {
                        text: "Bekor qilish"
                    }
                ]
            ]
        }
    })
}

// ======================================================

async function changeOrganName (text) {
    if (text == "🌿leaf => barg") {
        process.organs.push("leaf")
    }
    else if (text == "🌸flower => gul") {
        process.organs.push("flower")
    }
    else if (text == "🍏fruit => meva") {
        process.organs.push("fruit")
    }
    else if (text == "auto => auto") {
        process.organs.push("auto")
    }
}

// ============================================================

async function mainMenuBtn (text, bot, psql, user) {
    try {
        bot.sendMessage(user.chat_id, "Siz muvaffaqiyatli ro'yxatdan o'tdingiz. Siz endi bizning xizmatlardan bemalol fodalanishingiz mumkin", {
            reply_markup: {
                remove_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "🖼Rasm bilan qidirish",
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
    } catch (error) {
        console.log(error.message);
    }
}

// =====================================================================

async function cancelBtn (bot, psql, user) {
    process.pictures = []
    process.organs = []
    bot.sendMessage(user.chat_id, "Rasm va ma'lumotlarni qaytadan kiriting")
}

async function deleteBtn () {
    
}





export {
    setEmail,
    cancelBtn,
    chackCode,
    mainMenuBtn,
    notificationPic,
    changeOrganName
}