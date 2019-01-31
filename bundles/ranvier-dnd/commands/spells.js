'use strict';

const PlayerClass = require('../player-class');
const SpellManager = require('../spell-manager');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const manager = new SpellManager();
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const s = msg => Broadcast.sayAt(player, msg);

            // all spells for class and level eg. wizard 2
            const match = input.match(/([a-zA-Z]*)\s([0-9])/);
            if (match) {
                const [, cls, lvl] = match;
                const level = parseInt(lvl, 10);
                if (!Number.isNaN(level)) {
                    const cantrip = level === 0 ? 'cantrip ' : '';
                    s(
                        `Below is a list of level ${level} ${cls} ${cantrip}spells`
                    );
                    s(``);
                    manager
                        .spellsForLevelAndClass(level, cls)
                        .forEach(spell => {
                            s(`${spell.name}`);
                        });
                }
                return;
            }

            // all spells for level eg. 3
            const num = parseInt(input, 10);
            if (!Number.isNaN(num)) {
                const cantrip = num === 0 ? 'cantrip ' : '';
                s(`Below is a list of level ${num} ${cantrip}spells`);
                s(``);
                manager.spellsByLevel(num).forEach(spell => {
                    s(`${spell.name}`);
                });
                return;
            }

            // all spells for class eg. druid
            if (input) {
                s(`Below is a list of spells for class ${input}`);
                s(``);
                manager.spellsForClass(input).forEach(spell => {
                    s(`${spell.name}`);
                });
                return;
            }
        },
    };
};
