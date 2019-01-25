'use strict';

const PlayerClass = require('../player-class');

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'wizard',
        description: 'Dimble the Gnome wizard',
        abilityTable: {},

        setupPlayer: (state, player) => {
            const cls = new PlayerClass(player, state);
            cls.class = 'wizard';
            cls.race = 'gnome';
            cls.str = 8;
            cls.dex = 13;
            cls.con = 15;
            cls.int = 17;
            cls.wis = 10;
            cls.cha = 12;
            cls.maxHp = 8;
            cls.currentHp = 8;
            cls.ac = 11;
            cls.hitdice = '1d8';
            cls.level = 1;
            cls.speed = 25;
            cls.proficiency = 2;
            cls.savingThrows = ['intelligence', 'wisdom'];
            cls.skillProficiencies = [
                'arcana',
                'history',
                'insight',
                'investigation',
            ];
            cls.armorProficiencies = [];
            cls.toolProficiencies = [`Tinker's Tools`];
            cls.weaponProficiencies = ['Martial Weapons', 'Simple Weapons'];
            cls.languageProficiencies = [
                'Celestial',
                'Common',
                'Elvish',
                'Gnomish',
            ];
            cls.defenses = ['Poison'];

            player.setMeta('weapons', []);

            cls.addWeapon(
                'Quarterstaff',
                '5ft',
                +1,
                '1d6-1',
                'Simple, Versatile'
            );

            player.prompt =
                '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> ]';
        },
    };
};
