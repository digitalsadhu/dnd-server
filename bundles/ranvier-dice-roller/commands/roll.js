'use strict';

const { DiceRoller } = require('rpg-dice-roller');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (args, player) => {
            const roller = new DiceRoller();
            Broadcast.sayAtExcept(
                player,
                `<cyan>${
                    player.name
                }</cyan> rolls the dice! <yellow>${roller.roll(args)}</yellow>`
            );
        },
    };
};
