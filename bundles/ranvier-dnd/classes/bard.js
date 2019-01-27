'use strict';

const PlayerClass = require('../player-class');

/**
 * See barbarian.js for more on classes.
 */
module.exports = srcPath => {
    return {
        name: 'Bard',
        description: 'Caelynn the half-elf bard',
        abilityTable: {},

        initPlayer: (state, player) => {
            const cls = new PlayerClass(player, state);
            cls.xp = 0;
            cls.pp = 0;
            cls.gp = 15;
            cls.ep = 0;
            cls.sp = 0;
            cls.cp = 0;
            cls.class = 'bard';
            cls.race = 'half-elf';
            cls.str = 10;
            cls.dex = 14;
            cls.con = 12;
            cls.int = 14;
            cls.wis = 9;
            cls.cha = 17;
            cls.maxHp = 9;
            cls.currentHp = 9;
            cls.ac = 13;
            cls.hitdice = '1d8';
            cls.level = 1;
            cls.speed = 30;
            cls.proficiency = 2;
            cls.savingThrows = ['dexterity', 'charisma'];
            cls.skillProficiencies = [
                'acrobatics',
                'insight',
                'perception',
                'performance',
                'persuasion',
                'religion',
            ];
            cls.armorProficiencies = ['Light Armor'];
            cls.toolProficiencies = [
                'Disguise Kit',
                'Dulcimer',
                'Flute',
                'Lute',
                'Viol',
            ];
            cls.weaponProficiencies = [
                'Crossbow, Hand',
                'Longsword',
                'Rapier',
                'Shortsword',
                'Simple Weapons',
            ];
            cls.languageProficiencies = ['Common', 'Elvish', 'Goblin'];
            cls.defenses = [];

            cls.addWeapon('Rapier', '5ft', +4, '1d8+2', 'Martial, Finesse');
            cls.addWeapon(
                'Dagger',
                '20ft(60ft)',
                +4,
                '1d4+2',
                'Simple, Finesse, Light, Thrown, Range(20 / 60)'
            );
            cls.addWeapon('Unarmed Strike', '5ft', +2, '1');

            cls.cantrips = ['Dancing Lights', 'Vicious Mockery'];
            cls.preparedSpells = [
                'Charm Person',
                'Detect Magic',
                'Healing Word',
                'Thunderwave',
            ];
            cls.maxSpellSlots = 2;
            cls.currentSpellSlots = 2;

            cls.equipment = [
                { name: 'Backpack', qty: 1 },
                { name: 'Bedroll', qty: 1 },
                { name: 'Candle', qty: 5 },
                { name: 'Clothes, Costume', qty: 3 },
                { name: 'Dagger', qty: 1 },
                { name: 'Disguise Kit', qty: 1 },
                { name: 'Flute', qty: 1 },
                { name: 'Leather', qty: 1 },
                { name: 'Lute', qty: 1 },
                { name: 'Rapier', qty: 1 },
            ];
        },

        setupPlayer: (state, player) => {
            player.prompt =
                '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> <b><cyan>%slots.current%</cyan></b>/<cyan>%slots.max%</cyan> <b>ss</b> <yellow>%xp.max%</yellow> <b>xp</b> ]';
        },
    };
};
