'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = m => Broadcast.sayAtExcept(player.room, m);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            if (!input) {
                sayOther(
                    `<cyan>${player.name}'s</cyan> hit points are <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                sayMe(
                    `Your hit points are <yellow>${cls.currentHp}/${
                        cls.maxHp
                    }</yellow>`
                );
                return;
            }

            if (input.trim() === '/') {
                sayOther(
                    `<cyan>${player.name}'s</cyan> hit points are <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                sayMe(
                    `Your hit points are <yellow>${cls.currentHp}/${
                        cls.maxHp
                    }</yellow>`
                );
                return;
            }

            if (input.includes('-') || input.includes('+')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = cls.currentHp + newValue;
                sayOther(
                    `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                sayMe(
                    `Your hit points are now <yellow>${cls.currentHp}/${
                        cls.maxHp
                    }</yellow>`
                );
                return;
            }

            if (!input.includes('/')) {
                const newValue = parseInt(input, 10);
                cls.currentHp = newValue;
                sayAll(
                    `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                        cls.currentHp
                    }/${cls.maxHp}</yellow>`
                );
                sayMe(
                    `Your hit points are now <yellow>${cls.currentHp}/${
                        cls.maxHp
                    }</yellow>`
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

            sayOther(
                `<cyan>${player.name}'s</cyan> hit points are now <yellow>${
                    cls.currentHp
                }/${cls.maxHp}</yellow>`
            );
            sayMe(
                `Your hit points are now <yellow>${cls.currentHp}/${
                    cls.maxHp
                }</yellow>`
            );
        },
    };
};
