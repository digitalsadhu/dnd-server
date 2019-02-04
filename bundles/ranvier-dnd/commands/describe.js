'use strict';

const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        aliases: ['d'],
        command: state => (value, player) => {
            const history = new GameHistory(Broadcast, player);
            const message = `<cyan>${value}</cyan>`;
            Broadcast.sayAt(player, message);
            history.log(`

${message}
            
`);
        },
    };
};
