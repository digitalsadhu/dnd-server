'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const cls = new PlayerClass(player, state);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);

            const roll = cls.rollInitiative();

            sayMe(`You roll for initiative: <yellow>${roll}</yellow>`);
            sayOther(
                `<cyan>${player.name}</cyan> rolls for initiative: <yellow>${
                    roll.total
                }</yellow>`
            );
        },
    };
};
