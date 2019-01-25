'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            const cls = new PlayerClass(player, state);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);

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

            let message = `a ${attr} saving throw`;

            if (type === 'advantage') {
                message += ' at advantage';
            }

            if (type === 'disadvantage') {
                message += ' at disadvantage';
            }

            sayOther(
                `<cyan>${player.name}</cyan> makes ${message}: <yellow>${
                    roll.total
                }</yellow>`
            );
            sayMe(`You make ${message}: <yellow>${roll}</yellow>`);
        },
    };
};
