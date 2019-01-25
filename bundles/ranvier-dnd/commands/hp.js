'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');
    const s = m => Broadcast.sayAtExcept(player.room, m);

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);

            if (!input) {
                s(
                    `<cyan>${player.name}'s</cyan> hit points are<yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                return;
            }

            if (input.trim() === '/') {
                s(
                    `<cyan>${player.name}'s</cyan> hit points are<yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                return;
            }

            if (input.includes('-') || input.includes('+')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = cls.currentHp + newValue;
                s(
                    `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                return;
            }

            if (!input.includes('/')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = newValue;
                s(
                    `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
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

            s(
                `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                    cls.currentHp
                }/${cls.maxHp}</yellow>`
            );
        },
    };
};
