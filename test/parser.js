const { expect } = require('chai');
const Parser = require('../Parser');
const parser = new Parser();

describe('Parser', () => {
    it('1 to 1 simple transaction', () => {
        const texts = [
            'Дима должен мне 10 гривен за еду',
            'Я закинул за диму 10 грн за еду',
            'закинул за диму 10 грн за еду',
            'Я диме должен 10 грн за еду',
            'Я диме 10 грн за еду',
        ];
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