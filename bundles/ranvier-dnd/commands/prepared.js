'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (_, player) => {
            const cls = new PlayerClass(player, state);
            const s = m => Broadcast.sayAtExcept(player.room, m);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            if (cls.preparedSpells.length === 0) {
                sayMe(`Sorry, you don't seem to have any prepared spells`);
            }
            sayMe(`You have the following spells prepared`);
            sayMe(``);

            cls.preparedSpells.forEach(spell => {
                sayMe(spell);
            });
        },
    };
};
