const assert = require('assert');
const spellcasting = require(`${__dirname}/dnd-resource-files/spellcasting.json`);

module.exports = class SpellcastingManager {
    spellcasting() {
        return spellcasting;
    }

    spellcastingByClass(name = '') {
        assert(typeof name === 'string', 'a valid class name is required');

        const classSpellcasting = spellcasting.filter(
            casting => casting.class.name.toLowerCase() === name.toLowerCase()
        );

        if (!classSpellcasting[0]) return {};

        return classSpellcasting[0];
    }
};
