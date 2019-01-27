'use strict';

const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = m => Broadcast.sayAtExcept(player.room, m);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayOther = msg =>
                Broadcast.sayAtExcept(player.room, msg, [player]);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

            // get, don't update
            if (!input) {
                sayMe(`You currently have <yellow>${cls.ep}ep</yellow> total`);
                return;
            }

            // update using + and -
            if (input[0] === '-' || input[0] === '+') {
                const oldValue = cls.ep;
                const newValue = parseInt(input.replace(' ', ''), 10);
                cls.ep = oldValue + newValue;

                // set to a fixed value
            } else {
                const newValue = parseInt(input, 10);
                cls.ep = newValue;
            }
            sayMe(`You now have <yellow>${cls.ep}ep</yellow> total`);
        },
    };
};
