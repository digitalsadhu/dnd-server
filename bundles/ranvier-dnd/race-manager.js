const assert = require('assert');
const races = require(`${__dirname}/dnd-resource-files/races.json`);

module.exports = class RaceManager {
    races() {
        return races;
    }

    raceByName(name = '') {
        assert(typeof name === 'string', 'a valid race name is required');

        const filteredRaces = races.filter(
            race => race.name.toLowerCase() === name.toLowerCase()
        );

        if (!filteredRaces[0]) return {};

        return filteredRaces[0];
    }
};
