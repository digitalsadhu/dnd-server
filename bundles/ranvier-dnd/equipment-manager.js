const assert = require('assert');
const equipmentList = require(`${__dirname}/dnd-resource-files/equipment.json`);

module.exports = class WeaponManager {
    equipment() {
        return equipmentList.filter(
            item => item.equipment_category !== 'Weapon'
        );
    }

    equipmentByName(name = '') {
        assert(typeof name === 'string', 'a valid equipment name is required');

        const equipment = equipmentList.filter(
            item => item.name.toLowerCase() === name.toLowerCase()
        );

        if (!equipment[0]) return {};

        return equipment[0];
    }
};
