const { expect } = require('chai');
const Calculator = require('../Calculator');
const TransactionDAO = require("../TransactionDAO");
const transactionDAO =  new TransactionDAO();
const parser = new Calculator(transactionDAO);

describe('Calculator', () => {
    it('transactions by currency', () => {
        const transactions = [{
            to: 1,
            from: 2,
            amount: 10,
            currency: 'UAH',
            description: 'за еду'
        },
        {
            to: 1,
            from: 2,
            amount: 10,
            currency: 'UAH',
            description: 'за еду'
        },
        {
            to: 2,
            from: 1,
            amount: 10,
            currency: 'UAH',
            description: 'за еду'
        }
    ]
        const context = {
            users: {
                'Дима': 1,
                'Ваня': 2
            },
            me: 1,
        };
        const expected = [{
            to: 1,
            from: 2,
            amount: 10,
            currency: 'UAH',
            description: 'за еду'
        }];
        for (const text of texts) {
            const actual = parser.parse(text, context);
            expect(actual).to.deep.equal(expected);
        }
    });
});