const assert = require('assert');
const subRaces = require(`${__dirname}/dnd-resource-files/subsubRaces.json`);

module.exports = class SubRaceManager {
    subraces() {
        return subRaces;
    }

    subraceByName(name = '') {
        assert(typeof name === 'string', 'a valid subrace name is required');

        const filteredSubRaces = subRaces.filter(
            subrace => subrace.name.toLowerCase() === name.toLowerCase()
        );

        if (!filteredSubRaces[0]) return {};

        return filteredSubRaces[0];
    }
};
