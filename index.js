require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const handler = require('./handler');


const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
bot.onText(/\/add (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    handler(resp)
        .catch(err => {
            console.error(err);
            process.exit(1);
        });


  // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
});
 
// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
 
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });