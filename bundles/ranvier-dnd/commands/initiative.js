'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const cls = new PlayerClass(player, state);
            Broadcast.sayAtExcept(player, `initiative ${cls.rollInitiative()}`);
        },
    };
};
