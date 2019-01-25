'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (skill, player) => {
            const cls = new PlayerClass(player, state);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            const lastChar = skill[skill.length - 1];
            let type = '';

            if (lastChar === '+') {
                type = 'advantage';
                skill = skill.replace('+', '').trim();
            }

            if (lastChar === '-') {
                type = 'disadvantage';
                skill = skill.replace('-', '').trim();
            }

            const roll = cls.makeSkillCheck(skill, type);

            let message = `a ${skill} check`;

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
