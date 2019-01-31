'use strict';

const WeaponManager = require('../weapon-manager');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (name, player) => {
            const manager = new WeaponManager();
            const history = new GameHistory(Broadcast, player);

            const sayOther = msg => history.log(msg);
            const s = msg => Broadcast.sayAt(player, msg);

            const w = manager.weaponByName(name);
            s(`${w.name}`);
            s(`${w.weapon_category}`);
            s(`${w.weapon_range}`);
            s(`${w.category_range}`);
            s(`${w.cost.quantity}${w.cost.unit}`);
            s(`${w.damage.dice_count}`);
            s(`${w.damage.dice_value}`);
            s(`${w.damage.damage_type.name}`);
            s(`${w.damage.range.normal}(${w.damage.range.long})`);
            s(`${w.damage.weight}`);
            s(`${w.damage.properties.map(p => p.name).join(',')}`);
            s(`${w['2h_damage'].dice_count}`);
            s(`${w['2h_damage'].dice_value}`);
            s(`${w['2h_damage'].damage_type.name}`);
            s('');
        },
    };
};
