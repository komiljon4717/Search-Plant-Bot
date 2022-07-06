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
    try {
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
    } catch (error) {
        console.log("chack code function");
        console.log(error.message);
    }
}

// ------------------------------------------------------

async function back (bot, psql, user) {
    try {
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
    } catch (error) {
        console.log("back function");
        console.log(error.message);
    }
}

// ==========================================================================


async function notificationPic (bot, psql, user) {
    try {
        bot.sendMessage(user.chat_id, "Bitta so'rovda 1 tadan 5 tagacha rasm yuborish mumkin. Kichik tomoni 600px dan kattaroq va 2000px dan kichikroq tasvirlardan foydalanishni tavsiya qilamiz. Ideal holatda, 1280x1280 piksel bo'ladi. Ko'rsatilgan piksellardan past rasmlarni aniqlanish darajasi past bo'ladi. Rasmni yuboring", {
            reply_markup: {
                remove_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "📤Jo'natish"
                        },
                        {
                            text: "Bekor qilish"
                        }
                    ],
                    [
                        {
                            text: "Orqaga"
                        }
                    ]
                ]
            }
        })
    } catch (error) {
        console.log("notification function");
        console.log(error.message);
    }
}

// ============================================================

async function mainMenuBtn (text, bot, psql, user) {
    try {
        process.pictures = []
        process.organs = []

        bot.sendMessage(user.chat_id, "Botga xush kelibsiz. Siz endi bizning xizmatlardan bemalol fodalanishingiz mumkin", {
            reply_markup: {
                remove_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "🖼Rasm bilan qidirish",
                        },
                        {
                            text: "GBIF bilan qidirish",
                        }
                    ]
                ]
            }
        })
    } catch (error) {
        console.log("mainMenuBtn function");
        console.log(error.message);
    }
}

// =================================================================================

async function cancelBtn (bot, psql, user) {
    try {
        process.pictures = []
        process.organs = []
        bot.sendMessage(user.chat_id, "Rasm va ma'lumotlarni qaytadan kiriting")
    } catch (error) {
        console.log("cancelBtn function");
        console.log(error.message);
    }
}

// =================================================================================

async function gbif (text, bot, psql, user) {

    try {
        let gbif = text.trim()
        const shrift = gbif.slice(6, 13)
        const link = `https://www.gbif.org/species/${shrift}`

        bot.sendMessage(user.chat_id, "URLni ochish uchun bosing", {
            reply_markup: {
                remove_keyboard: true,
                resize_keyboard: true,
                inline_keyboard: [
                    [
                        {
                            text: "Havolani ochish",
                            url: link
                        }
                    ],
                    
                ]
            }
        })
    } catch (error) {
        console.log("gbif function");
        console.log(error.message);
    }
}

// =======================================================================

async function gbifBtn (bot, user) {
    try {
        bot.sendMessage(user.chat_id, "GBIFni quyidagi ko'rinishda yuboring\nMasalan: GBIF: 1234567", {
            reply_markup: {
                remove_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "Orqaga",
                        }
                    ],
                    
                ]
            }
        })
    } catch (error) {
        console.log("gbifBtn function");
        console.log(error.message);
    }
}


export {
    gbif,
    gbifBtn,
    setEmail,
    cancelBtn,
    chackCode,
    mainMenuBtn,
    notificationPic,
}