'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = msg => Broadcast.sayAt(player, msg);

            s(
                `At your current level you have access to the following features`
            );
            s(``);
            cls.features.forEach(feat => {
                s(`Name: ${feat.name}`);
                s(`Level: ${feat.level}`);
                s(`Description: ${feat.desc}`);
                s(``);
            });
        },
    };
};
