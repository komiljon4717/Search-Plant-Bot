import TelegramBot from 'node-telegram-bot-api'

const token = '5315396035:AAG2f4WwQm8kxMVYLCobH0eyV_5nZSAnYjA';

const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/echo (.+)/, (msg, match) => {

//   const chatId = msg.chat.id;
//   const resp = match[1];

//   bot.sendMessage(chatId, resp);
// });

bot.on('polling_error', (error) => {
    console.log(error.code);  // => 'EFATAL'
});





bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  

  if (msg.text == "/start") {
    bot.sendMessage(msg.chat.id, "Salom botga xush kelibsiz! Elektron pochtangizni jo'nating")
    return
}

  bot.sendMessage(chatId, 'Received your message');
});