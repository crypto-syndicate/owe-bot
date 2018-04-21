const petrovich = require('petrovich');
const Parser = require('./Parser');

const parser = new Parser();

module.exports = async function handler(text) {
    const transactions = parser.parse(text);
    console.log(transactions);
};
