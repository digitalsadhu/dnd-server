'use strict';

const { DiceRoller } = require('rpg-dice-roller');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (args, player) => {
            const roller = new DiceRoller();
            Broadcast.sayAtExcept(
                player,
                `${player.name} rolls ${roller.roll(args)}`
            );
        },
    };
};
