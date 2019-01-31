'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);
            const sayOther = msg => history.log(msg);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            // display all
            if (!attr) {
                cls.attributes.forEach(attribute => {
                    const symbol = attribute.modifier >= 0 ? '+' : '';
                    Broadcast.sayAt(
                        player,
                        `${attribute.name} ${symbol}${attribute.modifier} (${
                            attribute.value
                        })`
                    );
                });

                return;
            }

            // display single
            const attribute = cls.attribute(attr);
            const symbol = attribute.modifier > 0 ? '+' : '';
            sayMe(
                `Your <cyan>${
                    attribute.name
                }</cyan> modifier is <yellow>${symbol}${
                    attribute.modifier
                }</yellow> (Based on a base ${attribute.name} stat of <yellow>${
                    attribute.value
                }</yellow>)`
            );
        },
    };
};
