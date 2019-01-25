'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const cls = new PlayerClass(player, state);

            if (value) {
                cls.ac = value;

                Broadcast.sayAt(
                    player,
                    `Your armor class is now <yellow>${cls.ac}</yellow>`
                );
                Broadcast.sayAtExcept(
                    player.room,
                    `<cyan>${player.name}'s</cyan> armor class is now <yellow>${
                        cls.ac
                    }</yellow>`,
                    [player]
                );
                return;
            }

            Broadcast.sayAt(
                player,
                `Your armor class is <yellow>${cls.ac}</yellow>`
            );
            Broadcast.sayAtExcept(
                player.room,
                `<cyan>${player.name}'s</cyan> armor class is <yellow>${
                    cls.ac
                }</yellow>`,
                [player]
            );
        },
    };
};
