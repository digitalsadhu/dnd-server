const assert = require('assert');
const traits = require(`${__dirname}/dnd-resource-files/traits.json`);

module.exports = class TraitManager {
    traits() {
        return traits;
    }

    traitByName(name = '') {
        assert(typeof name === 'string', 'a valid trait name is required');

        const filteredTraits = traits.filter(
            trait => trait.name.toLowerCase() === name.toLowerCase()
        );

        if (!filteredTraits[0]) return {};

        return filteredTraits[0];
    }

    traitsByRace(name = '') {
        assert(typeof name === 'string', 'a valid race name is required');

        return traits.filter(trait => {
            const races = trait.races.map(race => race.name.toLowerCase());
            return races.includes(name);
        });
    }

    traitsBySubRace(name = '') {
        assert(typeof name === 'string', 'a valid subrace name is required');
        const traits = new Map();
        this.traitsByRace(name).forEach(trait => {
            traits.set(trait.name, trait);
        });
        return Array.from(traits.values());
    }
};
