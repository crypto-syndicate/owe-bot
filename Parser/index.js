/**
 * Examples:
 * Дима должен мне 10 гривен за еду
 * Дима должен 10 за еду
 * Дима должен
 * (who) [должен] [to] (amount) [currency] [за (description)]
 * [who] [заплатил|закинул] [за (description)] (amount) [currency] на всех
 * 
 * Я заплатил за хавчик 500 гривен на всех
 * Я закинул 600 за ужин, а Ваня 50 на чаюху
 * 100 со всех за бенз мне
 * закинул за жеку 200 гривен
 * я закинул за жеку 200 гривен
 * дима закинул за жеку 1
 * 
 * Я закинул за хавло 500 гривен
 * Ваня на чаюху оставил 50
 * Жека ничего не закинул
 * 
 */

class ParserBySchema {
    constructor(schema) {
    }
}

class Parser {
    constructor() {
        const plainSchemes = [
            '[from] `должен` [to] [amount] [currency] [description]',
        ];
        this.schemes = plainSchemes.map(this.parseSchemes);
    }

    parseSchemes(plainSchema) {
        return plainSchema
            .split(/\s+/)
            .map(token => {
                if (token[0] === '[') {
                    return {
                        type: 'nonterminal',
                        content: token.replace(/\[|\]/g, ''),
                    };
                }
                if (token[0] === '`') {
                    return {
                        type: 'terminal',
                        content: token.replace(/`/g, ''),
                    }
                }
            })
    }

    parse(text) {
        const tokens = text.split(/\s+/);
        // transaction := [from] `должен` [to] [amount] [currency] [description]
        // 'Дима должен мне 10 гривен за еду',
        // 'Я закинул за диму 10 грн за еду',
        // 'закинул за диму 10 грн за еду',
        // 'Я диме должен 10 грн за еду',
        // 'Я диме 10 грн за еду',

        return [{
            to: 1,
            from: 2,
            amount: 10,
            currency: 'UAH',
            description: 'за еду'
        }];
    }
}

module.exports = Parser;
