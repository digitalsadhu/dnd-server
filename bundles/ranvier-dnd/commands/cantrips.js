'use strict';

const PlayerClass = require('../player-class');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (_, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);
            const s = msg => history.log(msg);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            if (cls.cantrips.length === 0) {
                sayMe(`Sorry, you don't seem to have any cantrips`);
            }
            sayMe(`You know the following cantrips`);
            sayMe(``);

            cls.cantrips.forEach(spell => {
                sayMe(spell);
            });
        },
    };
};
