'use strict';

const EquipmentManager = require('../equipment-manager');
const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const s = msg => Broadcast.sayAt(player, msg);
            const cls = new PlayerClass(player, state);
            const manager = new EquipmentManager();

            if (input === 'all') {
                manager.equipment().forEach(e => {
                    s(
                        `${e.name}, ${e.equipment_category}, ${
                            e.cost.quantity
                        }${e.cost.unit}, ${e.weight}lbs`
                    );
                });
            } else {
                s(`You have the following equipment on your person:`);
                s(``);

                cls.equipment.forEach(e => {
                    s(`<b>${e.name}</b> (<green>${e.qty}</green>)`);
                });
            }
        },
    };
};
