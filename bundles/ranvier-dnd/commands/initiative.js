'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);

            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg => history.log(msg);

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
