'use strict';

const WeaponManager = require('../weapon-manager');
const PlayerClass = require('../player-class');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const s = msg => Broadcast.sayAt(player, msg);
            const cls = new PlayerClass(player, state);
            const manager = new WeaponManager();

            if (input === 'all') {
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
            } else {
                s(`You have the following weapons in your possession`);
                s(``);

                cls.weapons.forEach(w => {
                    const symbol = w.modifier >= 0 ? '+' : '';
                    s(
                        `<b>${w.name}</b> (hit <green>${symbol}${
                            w.modifier
                        }</green>, damage <yellow>${w.damage}</yellow>, range ${
                            w.range
                        }, ${w.notes})`
                    );
                });
            }
        },
    };
};
