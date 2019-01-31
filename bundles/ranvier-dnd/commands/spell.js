'use strict';

const PlayerClass = require('../player-class');
const SpellManager = require('../spell-manager');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (name, player) => {
            const manager = new SpellManager();
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const s = msg => Broadcast.sayAt(player, msg);

            if (name) {
                const spell = manager.spellByName(name);

                s(`${spell.name}`);
                s(`Level ${spell.level} ${spell.school.name}`);
                s(`Casting Time: ${spell.casting_time}`);
                s(`Range: ${spell.range}`);
                s(
                    `Components: ${spell.components.join(' ')} ${
                        spell.material
                    }`
                );
                s(`Duration: ${spell.duration}`);
                s(`Classes: ${spell.classes.map(cls => cls.name).join(', ')}`);
                s(`Can cast as a ritual: ${spell.ritual}`);
                s(`${spell.desc}`);
                s(``);

                return;
            } else {
                s(`please provide the name of a spell to lookup`);
            }
        },
    };
};
