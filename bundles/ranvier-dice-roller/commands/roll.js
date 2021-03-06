'use strict';

const { DiceRoller } = require('rpg-dice-roller');
const { Broadcast } = require('ranvier');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = {
    usage: 'roll [dice roll]',
    command: state => (args, player) => {
        const roller = new DiceRoller();
        const history = new GameHistory(Broadcast, player);

        const roll = roller.roll(args);

        Broadcast.sayAt(player, `You roll the dice! <yellow>${roll}</yellow>`);
        history.log(
            `<cyan>${
                player.name
            }</cyan> rolls the dice! <yellow>${roll}</yellow>`
        );
    },
};
