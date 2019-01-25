'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (attr, player) => {
            const cls = new PlayerClass(player, state);

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
            Broadcast.sayAt(
                player,
                `${attribute.name} ${symbol}${attribute.modifier} (${
                    attribute.value
                })`
            );
        },
    };
};
