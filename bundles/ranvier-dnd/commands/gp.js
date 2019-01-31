'use strict';

const coins = require('../coins');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);

            coins('gp', state, input, player, sayMe);
        },
    };
};
