'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);

            if (!input) {
                Broadcast.sayAt(player, `${cls.currentHp}/${cls.maxHp}`);
                return;
            }

            if (input.trim() === '/') {
                Broadcast.sayAt(player, `${cls.currentHp}/${cls.maxHp}`);
                return;
            }

            if (input.includes('-') || input.includes('+')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = cls.currentHp + newValue;
                Broadcast.sayAt(player, `${cls.currentHp}/${cls.maxHp}`);
                return;
            }

            if (!input.includes('/')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = newValue;
                Broadcast.sayAt(player, `${cls.currentHp}/${cls.maxHp}`);
                return;
            }

            let [newValue, maxValue] = input.split('/');

            if (newValue) {
                cls.currentHp = newValue;
            }

            if (maxValue) {
                const curr = cls.currentHp;
                const max = cls.maxHp;
                cls.maxHp = maxValue;
                if (curr !== max) {
                    cls.currentHp = curr;
                }
            }

            Broadcast.sayAt(player, `${cls.currentHp}/${cls.maxHp}`);
        },
    };
};
