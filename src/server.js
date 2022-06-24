import TelegramBot from 'node-telegram-bot-api'
import  { find }  from './utils/checker.js'
import token from "./config.js"
import { database } from "./models/user/sequelize.js"

import { messageController } from './controllers/messageController.js'
import {pictureController} from './controllers/pictureController.js'


const bot = new TelegramBot(token.TOKEN, {polling: true});




async function main () {

    const psql = await database()
    await bot.on('text', (msg) => messageController(msg, bot, psql));
    // await bot.on('text', (msg) => pictureController(msg, bot, psql));



}
main()