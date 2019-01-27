'use strict';

const PlayerClass = require('../player-class');

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'Wizard',
        description: 'Dimble the Gnome wizard',
        abilityTable: {},

        initPlayer: (state, player) => {
            const cls = new PlayerClass(player, state);
            cls.xp = 0;
            cls.pp = 0;
            cls.gp = 10;
            cls.ep = 0;
            cls.sp = 0;
            cls.cp = 0;
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
            cls.hitdice = '1d6';
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
            cls.defenses = [];

            player.setMeta('weapons', []);

            cls.addWeapon(
                'Quarterstaff',
                '5ft',
                +1,
                '1d6-1',
                'Simple, Versatile'
            );

            cls.cantrips = ['Light', 'Mage Hand', 'Ray of Frost'];
            cls.spellbookSpells = [
                'Burning Hands',
                'Charm Person',
                'Feather Fall',
                'Mage Armor',
                'Magic Missile',
                'Sleep',
            ];
            cls.preparedSpells = [
                'Burning Hands',
                'Charm Person',
                'Magic Missile',
                'Sleep',
            ];
            cls.maxSpellSlots = 2;
            cls.currentSpellSlots = 2;

            cls.equipment = [
                { name: 'Backpack', qty: 1 },
                { name: 'Book', qty: 1 },
                { name: 'Ink(1 ounce bottle)', qty: 1 },
                { name: 'Ink Pen', qty: 1 },
                { name: 'Little Bag of Sand', qty: 1 },
                { name: 'Parchment(one sheet)', qty: 5 },
                { name: 'Quarterstaff', qty: 1 },
                { name: 'Rod', qty: 1 },
                { name: 'Small Knife', qty: 1 },
                { name: 'Spellbook', qty: 1 },
            ];
        },

        setupPlayer: (state, player) => {
            player.prompt =
                '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> <b><cyan>%slots.current%</cyan></b>/<cyan>%slots.max%</cyan> <b>ss</b> <yellow>%xp.max%</yellow> <b>xp</b> ]';
        },
    };
};
