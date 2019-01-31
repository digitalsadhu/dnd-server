'use strict';

const { EventUtil } = require('ranvier');
const PlayerClass = require('../player-class');
const a = require('indefinite');
const { GameHistory } = require('../../../util/dnd-helpers');

module.exports = srcPath => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
        command: state => (input, player) => {
            const cls = new PlayerClass(player, state);
            const history = new GameHistory(Broadcast, player);
            const sayOther = msg => history.log(msg);
            const sayMe = msg => Broadcast.sayAtExcept(player, msg);
            const sayAll = msg => Broadcast.sayAtExcept(player.room, msg);

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
                return sayMe(
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

            sayAll(
                `<cyan>${
                    player.name
                }</cyan> makes an attack roll wielding <cyan>${a(name)}</cyan>`
            );
            sayAll(
                `Attack roll: <yellow>${
                    attack.rolls.attackRoll.total
                }</yellow>${crit}`
            );
            sayMe(
                `Attack roll information: ${
                    attack.rolls.attackRoll
                }${advantageDisadvantageNotes}`
            );
            sayAll(
                `Damage roll: <yellow>${attack.rolls.damageRoll.total}</yellow>`
            );
            sayMe(
                `Damage roll information: ${
                    attack.rolls.damageRoll
                }${sneakAttackNotes}`
            );
        },
    };
};
