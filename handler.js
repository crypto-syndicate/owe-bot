const petrovich = require('petrovich');

module.exports = async function handler(text) {
    console.log(text);
};

class Parser {
    parse(text) {
        return {
            who: 123,
            to: 321,
            amount: 10,
            currency: 'UAH',
            description: 'за еду',
        }
    }
}

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