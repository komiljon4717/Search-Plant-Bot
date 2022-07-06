import TelegramBot from 'node-telegram-bot-api'
import token from "./config.js"
import { database } from "./models/user/sequelize.js"

import { messageController } from './controllers/messageController.js'
import {pictureController} from './controllers/pictureController.js'
import { writeLogFile } from './controllers/functions.js'


const bot = new TelegramBot(token.TOKEN, {polling: true});




async function main () {
    try {

        bot.on('polling_error', (error) => {
            console.log(error.code);
        });


        const psql = await database()
        bot.on('text', (msg) => messageController(msg, bot, psql));
        bot.on('photo', (msg) => pictureController(msg, bot, psql));
        console.log("Server is running...");
    } catch (error) {
        writeLogFile(error.message)
        console.log("server");
        console.log(error.message);
    }

}
main()