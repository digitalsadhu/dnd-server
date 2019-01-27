'use strict';

const { DiceRoller } = require('rpg-dice-roller');
const { Broadcast } = require('ranvier');

module.exports = {
    usage: 'roll [dice roll]',
    command: state => (args, player) => {
        const roller = new DiceRoller();
        Broadcast.sayAt(
            player,
            `You roll the dice! <yellow>${roller.roll(args)}</yellow>`
        );
        Broadcast.sayAtExcept(
            player.room,
            `<cyan>${player.name}</cyan> rolls the dice! <yellow>${roller.roll(
                args
            )}</yellow>`,
            [player]
        );
    },
};
