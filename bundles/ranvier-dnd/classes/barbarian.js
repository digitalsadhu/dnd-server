'use strict';

const PlayerClass = require('../player-class');

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'Barbarian',
        description: '',
        abilityTable: {
            1: { skills: ['rage', 'two weapon fighting'] },
        },

        setupPlayer: (state, player) => {
            const cls = new PlayerClass(player, state);
            cls.class = 'barbarian';
            cls.str = 17;
            cls.dex = 13;
            cls.con = 16;
            cls.int = 10;
            cls.wis = 12;
            cls.cha = 8;
            cls.hp = 15;
            cls.ac = 14;
            cls.hitdice = '1d12';
            cls.level = 1;
            cls.speed = 30;
            cls.proficiency = 2;
            cls.savingThrows = ['strength', 'constitution'];
            cls.skillProficiencies = ['animal handling', 'nature'];
            cls.armorProficiencies = ['Light Armor', 'Medium Armor', 'Shields'];
            cls.toolProficiencies = [
                'Brewers Supplies',
                'Smiths Tools',
                'Vehicles (Land)',
            ];
            cls.weaponProficiencies = ['Martial Weapons', 'Simple Weapons'];
            cls.languageProficiencies = ['Common', 'Dwarvish'];
            cls.defenses = ['Poison'];

            cls.addWeapon(
                'Greataxe',
                '5ft',
                +5,
                '1d12+3',
                'Slashing Damage, Martial, Two-Handed'
            );
            cls.addWeapon(
                'Handaxe',
                '20(60)ft',
                +5,
                '1d6+3',
                'Slashing Damage, Simple, Light, Thrown, Range (20/60)'
            );
            cls.addWeapon(
                'Javelin',
                '30(120)ft',
                +5,
                '1d6+3',
                'Piercing Damage, Simple, Thrown, Range (30/120)'
            );
            cls.addWeapon(
                'Unarmed Strike',
                '5ft',
                +5,
                '4',
                'Bludgeoning Damage'
            );

            player.prompt =
                '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> ]';
        },
    };
};
