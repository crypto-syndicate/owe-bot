const { expect } = require('chai');
const Parser = require('../Parser');
const parser = new Parser();

describe('Parser', () => {
    it('1 to 1 simple transaction', () => {
        const texts = [
            'Дима должен мне 10 гривен за еду',
            'Я закинул за диму 10 грн за еду',
            ''
        ];
        const context = {
            users: {
                'Дима': 123,
                'Ваня': 321
            },
            me: 321,
        };
        const expected = [{
            to: 321,
            from: 123,
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