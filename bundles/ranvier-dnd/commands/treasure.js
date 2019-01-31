'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);

            const s = m => Broadcast.sayAtExcept(player.room, m);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg => history.log(msg);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            sayMe(`platinum pieces <yellow>${cls.pp}</yellow>`);
            sayMe(`gold pieces <yellow>${cls.gp}</yellow>`);
            sayMe(`electrum pieces <yellow>${cls.ep}</yellow>`);
            sayMe(`silver pieces <yellow>${cls.sp}</yellow>`);
            sayMe(`copper pieces <yellow>${cls.cp}</yellow>`);
        },
    };
};
