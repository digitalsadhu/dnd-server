'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = msg => Broadcast.sayAt(player, msg);

            const traits = cls.allTraits;

            if (traits) {
                let message = `You have access to the following traits because of your race(${
                    cls.race
                })`;

                if (cls.subrace) {
                    message += ` and subrace (${cls.subrace})`;
                }

                s(message);
                s(``);
                traits.forEach(trait => {
                    s(`<yellow>${trait.name}</yellow>`);
                    s(``);
                    s(`${trait.desc}`);
                    s(``);
                });
            }
        },
    };
};
