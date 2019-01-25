const assert = require('assert');
const equipment = require(`${__dirname}/dnd-resource-files/equipment.json`);

module.exports = class WeaponManager {
    weapons() {
        return equipment.filter(
            weapon => weapon.equipment_category === 'Weapon'
        );
    }

    weaponByName(name = '') {
        assert(typeof name === 'string', 'a valid weapon name is required');

        const weapons = equipment.filter(
            weapon => weapon.name.toLowerCase() === name.toLowerCase()
        );

        if (!weapons[0]) return {};

        return weapons[0];
    }
};
