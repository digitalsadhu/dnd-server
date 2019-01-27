'use strict';

const PlayerClass = require('../player-class');

const levels = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 100000,
    13: 120000,
    14: 140000,
    15: 165000,
    16: 195000,
    17: 225000,
    18: 265000,
    19: 305000,
    20: 355000,
};

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

            // get, don't update
            if (!input) {
                sayMe(
                    `You currently have <yellow>${cls.xp}/${
                        levels[cls.level + 1]
                    }</yellow> experience points`
                );
                return;
            }

            // update using + and -
            if (input[0] === '-' || input[0] === '+') {
                const oldValue = cls.xp;
                const newValue = parseInt(input.replace(' ', ''), 10);
                cls.xp = oldValue + newValue;

                // set to a fixed value
            } else {
                const newValue = parseInt(input, 10);
                cls.xp = newValue;
            }
            sayMe(
                `Your experience points are now <yellow>${cls.xp}/${
                    levels[cls.level + 1]
                }</yellow>`
            );

            if (cls.xp >= levels[cls.level + 1]) {
                sayMe(
                    `<red>You have gained enough experience to advance to level ${cls.level +
                        1}</red>`
                );
                sayOther(
                    `<cyan>${
                        player.name
                    }</cyan> <red>has gained enough experience to advance to level ${cls.level +
                        1}</red>`
                );
            }
        },
    };
};
