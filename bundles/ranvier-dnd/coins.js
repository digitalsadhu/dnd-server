'use strict';

const PlayerClass = require('./player-class');

module.exports = (type, state, input, player, sayMe) => {
    const cls = new PlayerClass(player, state);

    // get, don't update
    if (!input) {
        sayMe(`You currently have <yellow>${cls[type]}${type}</yellow> total`);
        return;
    }

    // update using + and -
    if (input[0] === '-' || input[0] === '+') {
        const oldValue = cls[type];
        const newValue = parseInt(input.replace(' ', ''), 10);
        cls[type] = oldValue + newValue;

        // set total to a fixed value
    } else if (input.includes('total ')) {
        try {
            const newValue = parseInt(input.split(' ')[1], 10);
            if (Number.isNaN(newValue)) throw new Error();
            cls[type] = newValue;
        } catch (err) {
            sayMe(
                `Hmm... Something wasn't quite right there. Try '${type} total 100'`
            );
            return;
        }
    } else if (!Number.isNaN(parseInt(input, 10))) {
        const oldValue = cls[type];
        const newValue = parseInt(input, 10);
        cls[type] = oldValue + newValue;
    } else {
        sayMe(
            `Hmm... Something wasn't quite right there. Try '${type} total 100' or '${type} 100'`
        );
        return;
    }
    sayMe(`You now have <yellow>${cls[type]}${type}</yellow> total`);
};
