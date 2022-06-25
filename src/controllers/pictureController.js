


async function pictureController (msg, bot, psql) {
    
    let file = await bot.getFile(msg.photo[0].file_id)
    console.log(file);
}


export {
    pictureController
}