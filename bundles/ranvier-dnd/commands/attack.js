'use strict';

const { EventUtil } = require('ranvier');
const PlayerClass = require('../player-class');
const a = require('indefitite');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const s = msg => Broadcast.sayAtExcept(player.room, msg);

            let [name, opt1, opt2] = input.split(' ');
            let type = '';
            let advantageDisadvantageNotes = '';
            let sneakAttackNotes = '';
            let sneak = '';

            if (!name) {
                const say = EventUtil.genSay(player.socket);
                const write = EventUtil.genWrite(player.socket);

                for (let i = 1; i <= cls.weapons.length; i++) {
                    const w = cls.weapons[i];
                    if (w && w.name && w.range && w.modifier && w.damage) {
                        say(
                            `[${i}] ${w.name} (range: ${w.range}, modifier: ${
                                w.modifier
                            }, damage: ${w.damage})`
                        );
                    }
                }

                write('<bold>What would you like to attack with?</bold> ');

                player.socket.once('data', data => {
                    const num = parseInt(data.toString(), 10);
                    say('');
                    const w = cls.weapons[num - 1];

                    if (w) {
                        state.CommandManager.get('attack').execute(
                            w.name,
                            player
                        );
                    }
                });

                return;
            }

            name = name.toLowerCase();

            if (!cls.weapon(name)) {
                return s(
                    `invalid weapon, have you added ${name} to your weapons?`
                );
            }

            if (opt1 === '+' || opt2 === '+') {
                type = 'advantage';
                advantageDisadvantageNotes = ' (with advantage)';
            }

            if (opt1 === '-' || opt2 === '-') {
                type = 'disadvantage';
                advantageDisadvantageNotes = ' (with disadvantage)';
            }

            if (opt1 && opt1.includes('d')) {
                sneak = opt1;
                sneakAttackNotes = ` (with ${opt1} sneak attack damage)`;
            }

            if (opt2 && opt2.includes('d')) {
                sneak = opt2;
                sneakAttackNotes = ` (with ${opt2} sneak attack damage)`;
            }

            const attack = cls.attack(name, type, sneak);
            let crit = attack.rolls.isCrit() ? ' <red>CRITICAL HIT!</red>' : '';

            s(
                `<cyan>${
                    player.name
                }</cyan> makes an attack roll wielding <cyan>${a(name)}</cyan>`
            );
            // s(``);
            s(
                `Attack roll: <yellow>${
                    attack.rolls.attackRoll.total
                }</yellow>${crit}`
            );
            // s(`${attack.rolls.attackRoll}${advantageDisadvantageNotes}${crit}`);
            // s(``);
            s(`Damage roll: <yellow>${attack.rolls.damageRoll.total}</yellow>`);
            // s(`${attack.rolls.damageRoll}${sneakAttackNotes}`);
            // s(``);
            // s(`Weapon information: ${name}`);
            // s(
            //     `Range: ${attack.range}, Modifier: ${
            //         attack.modifier
            //     }, Damage: ${attack.damage}`
            // );
            // s(`${attack.notes}`);
        },
    };
};
