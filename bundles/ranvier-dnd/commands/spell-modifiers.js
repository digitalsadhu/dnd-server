'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const s = msg => Broadcast.sayAt(player, msg);

            const atk = cls.spellAttackModifier;
            const save = cls.spellSaveDC;
            const mod = cls.spellModifier;

            s('Your spell modifiers are:');
            s('');

            if (mod) {
                const symbol = mod >= 0 ? '+' : '';
                s(`base modifier: ${symbol}${mod}`);
            }
            if (save) {
                s(`spell save DC: ${save}`);
            }
            if (atk) {
                const symbol = atk >= 0 ? '+' : '';
                s(`spell attack modifier: ${symbol}${atk}`);
            }
            s(``);
        },
    };
};
