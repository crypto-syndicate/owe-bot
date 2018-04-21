require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const TransactionDAO = require('./TransactionDAO');
const MembersDAO = require('./MembersDAO');
const Parser = require('./Parser');

const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const transactionDAO = new TransactionDAO();
const membersDAO = new MembersDAO();
const parser = new Parser();
 
bot.onText(/\/разрулить/, (msg) => {
    bot.sendMessage(msg.chat.id, 'разрулил!');
});

bot.onText(/\/add (.+)/, (msg, match) => {
    console.log(msg);
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    addHandler(resp)
        .catch(err => {
            console.error(err);
            process.exit(1);
        });   
});

bot.onText(/\/join (.+)/, (msg, match) => {
    joinHandler(msg)
        .catch(err => {
            console.error(err);
            process.exit(1);
        });   
});

bot.onText(/\/users/, (msg, match) => {
    usersHandler(msg)
        .catch(err => {
            console.error(err);
            process.exit(1);
        });   
});

async function addHandler(text) {
    const transactions = parser.parse(text);
    console.log(transactions);
};

async function joinHandler(msg) {
    const aliases = msg.text.split(/\s+/);
    aliases.shift();
    membersDAO.joinUser(msg.from.id, msg.chat.id, { 
        aliases,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name,
    });
    bot.sendMessage(msg.chat.id, msg.from.first_name + ' присоединился к нам');
}

async function usersHandler(msg) {
    const text = membersDAO
        .getUsersByChat(msg.chat.id)
        .map(user => {
            const fullName = user.firstName + (user.lastName ? ' ' + user.lastName : '');
            const aliases = user.aliases.join(', ');
            return `${fullName} известный как ${aliases}`;
        })
        .join('\n');
    bot.sendMessage(msg.chat.id, text || 'Нема никого');
}
 
// send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
 
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });