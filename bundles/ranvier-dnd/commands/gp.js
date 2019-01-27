'use strict';

const coins = require('../coins');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            coins('gp', state, input, player, sayMe);
        },
    };
};
