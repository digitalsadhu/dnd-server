'use strict';

const { DiceRoller } = require('rpg-dice-roller');
const AttackRoll = require('./attack-roll');
const FeatureManager = require('./feature-manager');
const SpellManager = require('./spell-manager');

const skills = {
    str: 'strength',
    int: 'intelligence',
    dex: 'dexterity',
    con: 'constitution',
    wis: 'wisdom',
    cha: 'charisma',
    strength: 'strength',
    intelligence: 'intelligence',
    dexterity: 'dexterity',
    constitution: 'constitution',
    wisdom: 'wisdom',
    charisma: 'charisma',
    acrobatics: 'dexterity',
    'animal handling': 'wisdom',
    arcana: 'intelligence',
    athletics: 'strength',
    deception: 'charisma',
    history: 'intelligence',
    insight: 'wisdom',
    intimidation: 'charisma',
    investigation: 'intelligence',
    medicine: 'wisdom',
    nature: 'intelligence',
    perception: 'wisdom',
    performance: 'charisma',
    persuasion: 'charisma',
    religion: 'intelligence',
    'sleight of hand': 'dexterity',
    stealth: 'dexterity',
    survival: 'wisdom',
};

const modifiers = {
    1: -5,
    2: -4,
    3: -4,
    4: -3,
    5: -3,
    6: -2,
    7: -2,
    8: -1,
    9: -1,
    10: +0,
    11: +0,
    12: +1,
    13: +1,
    14: +2,
    15: +2,
    16: +3,
    17: +3,
    18: +4,
    19: +4,
    20: +5,
    21: +5,
    22: +6,
    23: +6,
    24: +7,
    25: +7,
    26: +8,
    27: +8,
    28: +9,
    29: +9,
    30: +10,
};

const attributes = [
    'strength',
    'str',
    'intelligence',
    'int',
    'dexterity',
    'dex',
    'wisdom',
    'wis',
    'constitution',
    'con',
    'charisma',
    'cha',
];

const aliases = {
    str: 'strength',
    strength: 'str',
    int: 'intelligence',
    intelligence: 'int',
    con: 'constitution',
    constitution: 'con',
    dex: 'dexterity',
    dexterity: 'dex',
    con: 'constitution',
    constitution: 'con',
    cha: 'charisma',
    charisma: 'cha',
};

module.exports = class PlayerClass {
    constructor(player, state) {
        this.player = player;
        this.state = state;
        this.roller = new DiceRoller();
        this.featureManager = new FeatureManager();
        this.spellManager = new SpellManager();
    }

    modifier(attr) {
        const value = this[attr];
        if (typeof value === 'number') {
            return modifiers[value];
        }
        throw new Error('Invalid target for modifier');
    }

    rollInitiative() {
        const modifier = this.modifier('dex');
        const symbol = modifier >= 0 ? '+' : '';
        return this.roller.roll(`1d20${symbol}${modifier}`);
    }

    makeSkillCheck(skill, type = '') {
        const proficiency = this.proficiency;
        const proficiencies = this.skillProficiencies;
        const attr = skills[skill];

        let modifier = modifiers[this[attr]];

        if (proficiencies.includes(skill)) {
            modifier = modifier + proficiency;
        }

        let symbol = modifier >= 0 ? '+' : '';

        let roll;

        if (type === 'advantage') {
            roll = this.roller.roll(`2d20-L${symbol}${modifier}`);
        } else if (type === 'disadvantage') {
            roll = this.roller.roll(`2d20-H${symbol}${modifier}`);
        } else {
            roll = this.roller.roll(`1d20${symbol}${modifier}`);
        }

        return roll;
    }

    get attributes() {
        return [
            {
                name: 'strength',
                value: this.str,
                modifier: this.modifier('str'),
            },
            {
                name: 'intelligence',
                value: this.int,
                modifier: this.modifier('int'),
            },
            {
                name: 'dexterity',
                value: this.dex,
                modifier: this.modifier('dex'),
            },
            {
                name: 'constitution',
                value: this.con,
                modifier: this.modifier('con'),
            },
            {
                name: 'wisdom',
                value: this.wis,
                modifier: this.modifier('wis'),
            },
            {
                name: 'charisma',
                value: this.cha,
                modifier: this.modifier('cha'),
            },
        ];
    }

    attribute(attr) {
        if (attr === 'str' || attr === 'strength') {
            return {
                name: 'strength',
                value: this.str,
                modifier: this.modifier('str'),
            };
        }
        if (attr === 'int' || attr === 'intelligence') {
            return {
                name: 'intelligence',
                value: this.int,
                modifier: this.modifier('int'),
            };
        }
        if (attr === 'dex' || attr === 'dexterity') {
            return {
                name: 'dexterity',
                value: this.dex,
                modifier: this.modifier('dex'),
            };
        }
        if (attr === 'con' || attr === 'constitution') {
            return {
                name: 'constitution',
                value: this.con,
                modifier: this.modifier('con'),
            };
        }
        if (attr === 'wis' || attr === 'wisdom') {
            return {
                name: 'wisdom',
                value: this.wis,
                modifier: this.modifier('wis'),
            };
        }
        if (attr === 'cha' || attr === 'charisma') {
            return {
                name: 'charisma',
                value: this.cha,
                modifier: this.modifier('cha'),
            };
        }
    }

    makeSavingThrow(attr, type = '') {
        if (!attributes.includes(attr)) {
            throw new Error('Invalid target for saving throw');
        }

        let modifier = this.modifier(attr);

        if (
            this.savingThrows.includes(attr) ||
            this.savingThrows.includes(aliases[attr])
        ) {
            modifier += this.proficiency;
        }

        const symbol = modifier >= 0 ? '+' : '';

        let roll;
        if (type === 'advantage') {
            roll = this.roller.roll(`2d20-L${symbol}${modifier}`);
        } else if (type === 'disadvantage') {
            roll = this.roller.roll(`2d20-H${symbol}${modifier}`);
        } else {
            roll = this.roller.roll(`1d20${symbol}${modifier}`);
        }

        return roll;
    }

    get race() {
        return this.player.getMeta('race') || null;
    }

    set race(race) {
        this.player.setMeta('race', race);
    }

    get subrace() {
        return this.player.getMeta('subrace') || null;
    }

    set subrace(subrace) {
        this.player.setMeta('subrace', subrace);
    }

    get subclass() {
        return this.player.getMeta('subclass') || null;
    }

    set subclass(subclass) {
        this.player.setMeta('subclass', subclass);
    }

    get class() {
        return this.player.getMeta('cclass') || null;
    }

    set class(cclass) {
        this.player.setMeta('cclass', cclass);
    }

    get str() {
        return this.player.getAttribute('str');
    }

    set str(value) {
        if (this.player.hasAttribute('str')) {
            this.player.setAttributeBase('str', value);
        } else {
            const str = this.state.AttributeFactory.create('str', value);
            this.player.addAttribute(str);
        }
    }

    get strength() {
        return this.player.getAttribute('str');
    }

    set strength(value) {
        if (this.player.hasAttribute('str')) {
            this.player.setAttributeBase('str', value);
        } else {
            const str = this.state.AttributeFactory.create('str', value);
            this.player.addAttribute(str);
        }
    }

    get dex() {
        return this.player.getAttribute('dex');
    }

    set dex(value) {
        if (this.player.hasAttribute('dex')) {
            this.player.setAttributeBase('dex', value);
        } else {
            const dex = this.state.AttributeFactory.create('dex', value);
            this.player.addAttribute(dex);
        }
    }

    get dexterity() {
        return this.player.getAttribute('dex');
    }

    set dexterity(value) {
        if (this.player.hasAttribute('dex')) {
            this.player.setAttributeBase('dex', value);
        } else {
            const dex = this.state.AttributeFactory.create('dex', value);
            this.player.addAttribute(dex);
        }
    }

    get con() {
        return this.player.getAttribute('con');
    }

    set con(value) {
        if (this.player.hasAttribute('con')) {
            this.player.setAttributeBase('con', value);
        } else {
            const con = this.state.AttributeFactory.create('con', value);
            this.player.addAttribute(con);
        }
    }

    get constitution() {
        return this.player.getAttribute('con');
    }

    set constitution(value) {
        if (this.player.hasAttribute('con')) {
            this.player.setAttributeBase('con', value);
        } else {
            const con = this.state.AttributeFactory.create('con', value);
            this.player.addAttribute(con);
        }
    }

    get int() {
        return this.player.getAttribute('int');
    }

    set int(value) {
        if (this.player.hasAttribute('int')) {
            this.player.setAttributeBase('int', value);
        } else {
            const int = this.state.AttributeFactory.create('int', value);
            this.player.addAttribute(int);
        }
    }

    get intelligence() {
        return this.player.getAttribute('int');
    }

    set intelligence(value) {
        if (this.player.hasAttribute('int')) {
            this.player.setAttributeBase('int', value);
        } else {
            const int = this.state.AttributeFactory.create('int', value);
            this.player.addAttribute(int);
        }
    }

    get wis() {
        return this.player.getAttribute('wis');
    }

    set wis(value) {
        if (this.player.hasAttribute('wis')) {
            this.player.setAttributeBase('wis', value);
        } else {
            const wis = this.state.AttributeFactory.create('wis', value);
            this.player.addAttribute(wis);
        }
    }

    get wisdom() {
        return this.player.getAttribute('wis');
    }

    set wisdom(value) {
        if (this.player.hasAttribute('wis')) {
            this.player.setAttributeBase('wis', value);
        } else {
            const wis = this.state.AttributeFactory.create('wis', value);
            this.player.addAttribute(wis);
        }
    }

    get cha() {
        return this.player.getAttribute('cha');
    }

    set cha(value) {
        if (this.player.hasAttribute('cha')) {
            this.player.setAttributeBase('cha', value);
        } else {
            const cha = this.state.AttributeFactory.create('cha', value);
            this.player.addAttribute(cha);
        }
    }

    get charisma() {
        return this.player.getAttribute('cha');
    }

    set charisma(value) {
        if (this.player.hasAttribute('cha')) {
            this.player.setAttributeBase('cha', value);
        } else {
            const cha = this.state.AttributeFactory.create('cha', value);
            this.player.addAttribute(cha);
        }
    }

    get maxHp() {
        return this.player.getBaseAttribute('health');
    }

    set maxHp(value) {
        if (this.player.hasAttribute('health')) {
            this.player.attributes.get('health').setBase(value);
        } else {
            const hp = this.state.AttributeFactory.create('health', value);
            this.player.addAttribute(hp);
        }
    }

    get currentHp() {
        return this.player.getAttribute('health');
    }

    set currentHp(value) {
        if (this.player.hasAttribute('health')) {
            let diff = Math.abs(this.maxHp - value);
            this.player.setAttributeToMax('health');
            if (value < 0) diff = this.maxHp;
            if (value < this.maxHp) this.player.lowerAttribute('health', diff);
            else if (value > this.maxHp)
                this.player.raiseAttribute('health', diff);
        } else {
            this.maxHp = value;
        }
    }

    get ac() {
        return this.player.getAttribute('ac');
    }

    set ac(value) {
        if (this.player.hasAttribute('ac')) {
            this.player.setAttributeBase('ac', value);
        } else {
            const ac = this.state.AttributeFactory.create('ac', value);
            this.player.addAttribute(ac);
        }
    }

    get hitdice() {
        return this.player.getMeta('hitdice');
    }

    set hitdice(value) {
        this.player.setMeta('hitdice', value);
    }

    get level() {
        return this.player.getAttribute('lvl');
    }

    set level(value) {
        if (this.player.hasAttribute('lvl')) {
            this.player.setAttributeBase('lvl', value);
        } else {
            const lvl = this.state.AttributeFactory.create('lvl', value);
            this.player.addAttribute(lvl);
        }
    }

    get speed() {
        return this.player.getAttribute('speed');
    }

    set speed(value) {
        if (this.player.hasAttribute('speed')) {
            this.player.setAttributeBase('speed', value);
        } else {
            const speed = this.state.AttributeFactory.create('speed', value);
            this.player.addAttribute(speed);
        }
    }

    get proficiency() {
        return this.player.getAttribute('proficiency');
    }

    set proficiency(value) {
        if (this.player.hasAttribute('proficiency')) {
            this.player.setAttributeBase('proficiency', value);
        } else {
            const proficiency = this.state.AttributeFactory.create(
                'proficiency',
                value
            );
            this.player.addAttribute(proficiency);
        }
    }

    get skillProficiencies() {
        return this.player.getMeta('skillProficiencies') || [];
    }

    set skillProficiencies(value) {
        this.player.setMeta('skillProficiencies', value);
    }

    get armorProficiencies() {
        return this.player.getMeta('armorProficiencies') || [];
    }

    set armorProficiencies(value) {
        this.player.setMeta('armorProficiencies', value);
    }

    get languageProficiencies() {
        return this.player.getMeta('languageProficiencies') || [];
    }

    set languageProficiencies(value) {
        this.player.setMeta('languageProficiencies', value);
    }

    get toolProficiencies() {
        return this.player.getMeta('toolProficiencies') || [];
    }

    set toolProficiencies(value) {
        this.player.setMeta('toolProficiencies', value);
    }

    get weaponProficiencies() {
        return this.player.getMeta('weaponProficiencies') || [];
    }

    set weaponProficiencies(value) {
        this.player.setMeta('weaponProficiencies', value);
    }

    get proficiencies() {
        return {
            skills: this.skillProficiencies,
            armor: this.armorProficiencies,
            weapons: this.weaponProficiencies,
            tools: this.toolProficiencies,
            languages: this.languageProficiencies,
        };
    }

    get savingThrows() {
        return this.player.getMeta('savingThrows') || [];
    }

    set savingThrows(value) {
        this.player.setMeta('savingThrows', value);
    }

    get passivePerception() {
        const proficiencies = this.skillProficiencies;
        const modifier = modifiers[this['wisdom']];

        if (proficiencies.includes('perception')) {
            return 10 + modifier + this.proficiency;
        }
        return 10 + modifier;
    }

    get passiveInvestigation() {
        const proficiencies = this.skillProficiencies;
        const modifier = modifiers[this['intelligence']];

        if (proficiencies.includes('investigation')) {
            return 10 + modifier + this.proficiency;
        }
        return 10 + modifier;
    }

    get passiveInsight() {
        const proficiencies = this.skillProficiencies;
        const modifier = modifiers[this.wis];

        if (proficiencies.includes('insight')) {
            return 10 + modifier + this.proficiency;
        }
        return 10 + modifier;
    }

    get defenses() {
        return this.player.getMeta('defenses') || [];
    }

    set defenses(value) {
        this.player.setMeta('defenses', value);
    }

    get conditions() {
        return this.player.getMeta('conditions') || [];
    }

    set conditions(value) {
        this.player.setMeta('conditions', value);
    }

    addWeapon(name, range, modifier, damage, notes) {
        const weapons = this.player.getMeta('weapons') || [];
        weapons.push({
            name,
            range,
            modifier,
            damage,
            notes,
        });
        this.player.setMeta('weapons', weapons);
    }

    removeWeapon(name) {
        const weapons = this.player.getMeta('weapons') || [];
        this.player.setMeta(
            'weapons',
            weapons.filter(
                weapon => weapon.name.toLowerCase() !== name.toLowerCase()
            )
        );
    }

    get weapons() {
        return this.player.getMeta('weapons') || [];
    }

    weapon(name) {
        const weapons = this.weapons.filter(
            weap => weap.name.toLowerCase() === name.toLowerCase()
        );
        if (weapons.length > 0) return weapons[0];
    }

    attack(name, type = '', sneak = '') {
        const { modifier, damage, notes, range } = this.weapon(name);

        const attackRoll = new AttackRoll({
            sneakAttack: sneak,
            attackModifier: modifier,
            damageDice: damage,
            advantage: type === 'advantage',
            disadvantage: type === 'disadvantage',
        });

        attackRoll.rollAttack();
        attackRoll.rollDamage();

        return {
            name,
            range,
            modifier,
            damage,
            notes,
            rolls: attackRoll,
        };
    }

    get features() {
        return this.featureManager.featuresForPlayer(this);
    }

    get spells() {
        return this.spellManager.spellsForPlayer(this);
    }

    save() {
        return this.player.save();
    }

    // SECTION: ATTACKING AND SKILLS/SPELLS
    // TODO: make an attack roll, interactive menu
    // TODO: make an attack roll, interactive menu
    // TODO: make a damage roll
    // TODO: skills
    // TODO: spells
    // TODO: heal
    // TODO: damage

    // SECTION: EQUIPMENT
    // TODO: money
    // TODO: equipment
    // TODO: attunement

    // SECTION: BACKGROUND
    // TODO: background
    // TODO: characteristics
    // TODO: appearance

    // SECTION: NOTES
    // TODO: organisations
    // TODO: allies
    // TODO: enemies
    // TODO: organisations
    // TODO: other
};
