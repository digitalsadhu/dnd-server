'use strict';

const { DiceRoller } = require('rpg-dice-roller');
const assert = require('assert');

module.exports = class AttackRoll {
    constructor({
        sneakAttack = '',
        attackModifier,
        damageDice,
        advantage = false,
        disadvantage = false,
    } = {}) {
        assert(
            !(advantage && disadvantage),
            `Attack rolls cannot both have advantage and also disadvantage at the same time`
        );
        assert(
            typeof attackModifier === 'number',
            `Attack modifier must be a number`
        );

        this.attackModifier = attackModifier;
        this.sneakAttack = sneakAttack;
        this.damageDice = damageDice;
        this.advantage = advantage;
        this.disadvantage = disadvantage;

        this.roller = new DiceRoller();
        this.crit = false;
        this.attackRoll = 0;
        this.damageRoll = 0;
    }

    symbolFor(modifier) {
        return modifier >= 0 ? '+' : '';
    }

    rollAttack() {
        const symbol = this.symbolFor(this.attackModifier);

        if (this.advantage) {
            return (this.attackRoll = this.roller.roll(
                `2d20-L${symbol}${this.attackModifier}`
            ));
        }

        if (this.disadvantage) {
            return (this.attackRoll = this.roller.roll(
                `2d20-H${symbol}${this.attackModifier}`
            ));
        }

        return (this.attackRoll = this.roller.roll(
            `1d20${symbol}${this.attackModifier}`
        ));
    }

    isCrit() {
        const rolls = this.attackRoll.rolls[0];
        if (rolls.includes(20) && this.advantage) {
            return true;
        }

        if (rolls[0] === 20 && !this.advantage && !this.disadvantage) {
            return true;
        }

        if (rolls[0] === 20 && rolls[1] === 20) {
            return true;
        }

        return false;
    }

    rollDamage() {
        const modifiers = [];
        let sneakDamageDice = '';

        if (this.sneakAttack) {
            let [numRolls, rest] = this.sneakAttack.split('d');
            let symbol = '+';

            let [die, modifier = 0] = rest.split('+');

            if (rest.includes('-')) {
                [die, modifier] = rest.split('-');
                symbol = '-';
            }

            numRolls = parseInt(numRolls, 10);

            if (this.isCrit()) {
                // CRIT, double damage dice!!
                numRolls = numRolls * 2;
            }

            sneakDamageDice = `+${numRolls}d${die}`;
            modifiers.push({ symbol, modifier });
        }

        // split out the 1 from 1d6+3 and increment it for a crit
        // parseInt(damage.split('d')[0], 10);
        let [numRolls, rest] = this.damageDice.split('d');
        let symbol = '+';

        let [die, modifier] = rest.split('+');

        if (rest.includes('-')) {
            [die, modifier] = rest.split('-');
            symbol = '-';
        }

        modifiers.push({ symbol, modifier });

        numRolls = parseInt(numRolls, 10);

        if (this.isCrit()) {
            // CRIT, double damage dice!!
            numRolls = numRolls * 2;
        }

        return (this.damageRoll = this.roller.roll(
            `${numRolls}d${die}${sneakDamageDice}${modifiers
                .map(({ symbol, modifier }) => `${symbol}${modifier}`)
                .join('')}`
        ));
    }
};
