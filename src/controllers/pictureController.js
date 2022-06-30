

async function pictureController (msg, bot, psql) {
    try {
        const chat_id = msg.chat.id

        const user = await psql.user.findOne({
            where: {
                chat_id: chat_id,
            }
        })

        if (user.step == 3) {
            
            let messageInfo = await bot.sendMessage(chat_id, "Yuklanmoqda...")
            let url = await bot.downloadFile(msg.photo[msg.photo.length - 1].file_id, './images')
            process.pictures.push(url)
            bot.deleteMessage(user.chat_id, messageInfo.message_id)

        }
        else {
            bot.sendMessage(chat_id, "Kutilmagan ma'lumot kiritildi")
        }
        
    }
    catch (error) {
        console.log(error.message)
    }
}


export {
    pictureController
}