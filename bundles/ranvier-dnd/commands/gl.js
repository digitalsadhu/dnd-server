'use strict';

const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const gameHistory = new GameHistory(Broadcast, player);

            if (value) {
                gameHistory.print(value);
            } else {
                gameHistory.printUnread();
            }
        },
    };
};
