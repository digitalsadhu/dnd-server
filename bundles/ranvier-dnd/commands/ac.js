'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (value, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);

            if (value) {
                cls.ac = value;

                Broadcast.sayAt(
                    player,
                    `Your armor class is now <yellow>${cls.ac}</yellow>`
                );
                history.log(
                    `<cyan>${player.name}'s</cyan> armor class is now <yellow>${
                        cls.ac
                    }</yellow>`
                );
                return;
            }

            Broadcast.sayAt(
                player,
                `Your armor class is <yellow>${cls.ac}</yellow>`
            );
            history.log(
                `<cyan>${player.name}'s</cyan> armor class is <yellow>${
                    cls.ac
                }</yellow>`
            );
        },
    };
};
