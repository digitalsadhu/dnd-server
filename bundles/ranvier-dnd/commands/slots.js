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
                    `<cyan>${player.name}'s</cyan> spell slots are <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                sayMe(
                    `Your spell slots are <yellow>${cls.currentSpellSlots}/${
                        cls.maxSpellSlots
                    }</yellow>`
                );
                return;
            }

            if (input.trim() === '/') {
                sayOther(
                    `<cyan>${player.name}'s</cyan> spell slots are <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                sayMe(
                    `Your spell slots are <yellow>${cls.currentSpellSlots}/${
                        cls.maxSpellSlots
                    }</yellow>`
                );
                return;
            }

            if (input.includes('-') || input.includes('+')) {
                const newValue = parseInt(input, 10);
                cls.currentSpellSlots = cls.currentSpellSlots + newValue;
                sayOther(
                    `<cyan>${
                        player.name
                    }'s</cyan> spell slots are now <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                sayMe(
                    `Your spell slots are now <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                return;
            }

            if (!input.includes('/')) {
                const newValue = parseInt(input, 10);
                cls.currentSpellSlots = newValue;
                sayAll(
                    `<cyan>${
                        player.name
                    }'s</cyan> spell slots are now <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                sayMe(
                    `Your spell slots are now <yellow>${
                        cls.currentSpellSlots
                    }/${cls.maxSpellSlots}</yellow>`
                );
                return;
            }

            let [newValue, maxValue] = input.split('/');

            if (newValue) {
                cls.currentSpellSlots = newValue;
            }

            if (maxValue) {
                const curr = cls.currentSpellSlots;
                const max = cls.maxSpellSlots;
                cls.maxSpellSlots = maxValue;
                if (curr !== max) {
                    cls.currentSpellSlots = curr;
                }
            }

            sayOther(
                `<cyan>${player.name}'s</cyan> spell slots are now <yellow>${
                    cls.currentSpellSlots
                }/${cls.maxSpellSlots}</yellow>`
            );
            sayMe(
                `Your spell slots are now <yellow>${cls.currentSpellSlots}/${
                    cls.maxSpellSlots
                }</yellow>`
            );
        },
    };
};
