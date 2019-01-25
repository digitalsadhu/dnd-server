'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (skill, player) => {
            const cls = new PlayerClass(player, state);

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

            let message = `${skill} check for ${player.name}`;

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
