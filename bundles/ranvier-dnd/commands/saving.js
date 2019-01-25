'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            const cls = new PlayerClass(player, state);

            const lastChar = attr[attr.length - 1];
            let type = '';

            if (lastChar === '+') {
                type = 'advantage';
                attr = attr.replace('+', '').trim();
            }

            if (lastChar === '-') {
                type = 'disadvantage';
                attr = attr.replace('-', '').trim();
            }

            const roll = cls.makeSavingThrow(attr, type);

            let message = `${attr} save for ${player.name}`;

            if (type === 'advantage') {
                message += ' at advantage';
            }

            if (type === 'disadvantage') {
                message += ' at disadvantage';
            }

            Broadcast.sayAtExcept(player, `${message} ${roll}`);
        },
    };
};
