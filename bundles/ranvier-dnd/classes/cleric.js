'use strict';

const PlayerClass = require('../player-class');

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'Cleric',
        description: 'Aurorette Hammerblower the human cleric',
        abilityTable: {},

        initPlayer: (state, player) => {
            const cls = new PlayerClass(player, state);
            cls.xp = 0;
            cls.pp = 0;
            cls.gp = 10;
            cls.ep = 0;
            cls.sp = 0;
            cls.cp = 0;
            cls.class = 'cleric';
            cls.race = 'human';
            cls.str = 14;
            cls.dex = 9;
            cls.con = 15;
            cls.int = 11;
            cls.wis = 16;
            cls.cha = 13;
            cls.maxHp = 10;
            cls.currentHp = 10;
            cls.ac = 18;
            cls.hitdice = '1d8';
            cls.level = 1;
            cls.speed = 25;
            cls.proficiency = 2;
            cls.savingThrows = ['wisdom', 'charisma'];
            cls.skillProficiencies = [
                'insight',
                'medicine',
                'persuasion',
                'religion',
            ];
            cls.armorProficiencies = [
                'Heavy Armor',
                'Light Armor',
                'Medium Armor',
                'Shields',
            ];
            cls.toolProficiencies = [];
            cls.weaponProficiencies = ['Simple Weapons'];
            cls.languageProficiencies = ['Common', 'Gith', 'Gnomish', 'Sylvan'];
            cls.defenses = [];

            player.setMeta('weapons', []);

            cls.addWeapon(
                'Crossbow, Light',
                '80ft(320ft)',
                +1,
                '1d8-1',
                'Simple, Ammunition, Loading, Range, Two-Handed, Range (80/320)'
            );

            cls.addWeapon('Mace', '5ft', +4, '1d6+2', 'Simple');
            cls.addWeapon('Unarmed Strike', '5ft', +4, '3', 'Simple');

            cls.cantrips = ['Guidance', 'Sacred Flame', 'Spare the Dying'];
            cls.preparedSpells = [
                'Bane',
                'Bless',
                'Cure Wounds',
                'Guiding Bolt',
                'Healing Word',
                'Inflict Wounds',
            ];
            cls.maxSpellSlots = 2;
            cls.currentSpellSlots = 2;

            cls.equipment = [
                { name: 'Alms Box', qty: 1 },
                { name: 'Backpack', qty: 1 },
                { name: 'Blanket', qty: 1 },
                { name: 'Block of Incense', qty: 2 },
                { name: 'Candle', qty: 10 },
                { name: 'Censer', qty: 1 },
                { name: 'Chain Mail', qty: 1 },
                { name: 'Crossbow Bolts', qty: 20 },
                { name: 'Crossbow, Light', qty: 1 },
                { name: 'Mace', qty: 1 },
            ];
        },

        setupPlayer: (state, player) => {
            player.prompt =
                '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> <b><cyan>%slots.current%</cyan></b>/<cyan>%slots.max%</cyan> <b>ss</b> <yellow>%xp.max%</yellow> <b>xp</b> ]';
        },
    };
};
