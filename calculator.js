const _ = require('lodash');

class Calculator {

    constructor(transactionsDAO) {
        this.transactionsDAO = transactionsDAO;
    }
    calculate(userId) {
        const userTransactions = this.transactionsDAO
            .getTransactions()
            .filter(k => k.to === userId || k.from === userId);

        const groupedUserTransactions = _.groupBy(userTransactions, 'currency');
        const accounts = {};

        for (const [currency, transactions] of Object.entries(groupedUserTransactions)) {

            const currencyAccounts = {currency, accounts: []};

            for (const transaction of transactions){
                if (transaction.from === userId) {
                    currencyAccounts.accounts[transaction.to] -= transaction.amount;
                }
                if (transaction.to === userId){
                    currencyAccounts.accounts[transaction.from] += transaction.amount;
                }
            }
            accounts.push(currencyAccounts);
        }
        return accounts;
    }
}
module.exports = Calculator;