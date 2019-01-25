const assert = require('assert');
const spells = require(`${__dirname}/dnd-resource-files/spells.json`);
const levels = require(`${__dirname}/dnd-resource-files/levels.json`);

module.exports = class SpellManager {
    spellByName(name = '') {
        assert(typeof name === 'string', 'a valid spell name is required');

        const spls = spells.filter(
            spl => spl.name.toLowerCase() === name.toLowerCase()
        );

        if (!spls[0]) return {};

        return spls[0];
    }

    spellsByLevel(level) {
        assert(typeof level === 'number', 'a valid spell level is required');

        const spls = spells.filter(spl => spl.level === level);

        return spls;
    }

    spellsForClass(characterClass) {
        assert(
            typeof characterClass === 'string',
            'a valid character class is required'
        );

        const spls = spells.filter(spl => {
            const classes = spl.classes.map(cls => cls.name.toLowerCase());
            return classes.includes(characterClass.toLowerCase());
        });

        return spls;
    }

    spellsForSubClass(subClass) {
        assert(
            typeof subClass === 'string',
            'a valid character subclass is required'
        );

        const spls = spells.filter(spl => {
            if (!spl.subclass.name) return false;
            return spl.subclass.name.toLowerCase() === subClass.toLowerCase();
        });

        return spls;
    }

    spellsForLevelAndClass(level, cclass = '') {
        assert(typeof level === 'number', 'a valid player level is required');
        assert(cclass, 'a valid player class is required');

        const levelInfo = levels.filter(
            lvl =>
                lvl.class.name.toLowerCase() === cclass.toLowerCase() &&
                lvl.level === level
        );

        let sc = {};

        if (levelInfo.length === 1) {
            sc = levelInfo[0].spellcasting;
        }

        let highestSpellLevel = 0;

        if (sc['spell_slots_level_1'] > 0) highestSpellLevel = 1;
        if (sc['spell_slots_level_2'] > 0) highestSpellLevel = 2;
        if (sc['spell_slots_level_3'] > 0) highestSpellLevel = 3;
        if (sc['spell_slots_level_4'] > 0) highestSpellLevel = 4;
        if (sc['spell_slots_level_5'] > 0) highestSpellLevel = 5;
        if (sc['spell_slots_level_6'] > 0) highestSpellLevel = 6;
        if (sc['spell_slots_level_7'] > 0) highestSpellLevel = 7;
        if (sc['spell_slots_level_8'] > 0) highestSpellLevel = 8;
        if (sc['spell_slots_level_9'] > 0) highestSpellLevel = 9;

        const spls = spells.filter(spl => {
            const classes = spl.classes.map(cls => cls.name.toLowerCase());

            return (
                classes.includes(cclass.toLowerCase()) &&
                spl.level <= highestSpellLevel
            );
        });

        return spls;
    }

    spellsForPlayer(player) {
        assert(player, 'a valid player is required');
        assert(player.level, 'player must include a level');
        assert(player.class, 'player must include a class');

        return this.spellsForLevelAndClass(player.level, player.class);
    }
};
