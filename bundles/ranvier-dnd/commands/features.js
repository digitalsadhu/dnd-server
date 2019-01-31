'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');
    const { GameHistory } = require('../../../util/dnd-helpers');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const s = msg => Broadcast.sayAt(player, msg);

            s(
                `At your current level you have access to the following class features`
            );
            s(``);
            cls.features.forEach(feat => {
                s(`Name: <yellow>${feat.name}</yellow>`);
                s(`Level: <yellow>${feat.level}</yellow>`);
                s(`Description: ${feat.desc}`);
                s(``);
            });
        },
    };
};
