'use strict';

const WeaponManager = require('../weapon-manager');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (_, player) => {
            const s = msg => Broadcast.sayAt(player, msg);
            const manager = new WeaponManager();

            manager.weapons().forEach(w => {
                let dice = w.damage.dice_count;

                if (w.damage.dice_value) {
                    dice += `d${w.damage.dice_value}`;
                }
                const type = w.damage.damage_type.name;
                const category = w['weapon_category:'];
                s(
                    `<b>${
                        w.name
                    }</b> (<green>${dice}</green> <yellow>${type}</yellow>, ${category}, ${
                        w.weapon_range
                    })`
                );
            });
        },
    };
};
