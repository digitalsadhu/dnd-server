'use strict';

const tap = require('tap');
const SpellManager = require('./spell-manager');

const manager = new SpellManager();

tap.test('spellByName 1', t => {
    const spl = manager.spellByName('fireball');
    t.equal(spl.name, 'Fireball');
    t.end();
});

tap.test('spellByName 2', t => {
    const spl = manager.spellByName('magic missile');
    t.equal(spl.name, 'Magic Missile');
    t.end();
});

tap.test('spellsByLevel', t => {
    const spls = manager.spellsByLevel(1);
    t.equal(spls[0].name, 'Alarm');
    t.end();
});

tap.test('spellsByLevel', t => {
    const spls = manager.spellsByLevel(2);
    t.equal(spls[0].name, 'Acid Arrow');
    t.end();
});

tap.test('spellsForClass', t => {
    const spls = manager.spellsForClass('wizard');
    t.equal(spls[0].name, 'Acid Arrow');
    t.end();
});

tap.test('spellsForLevelAndClass 1', t => {
    const spls = manager.spellsForLevelAndClass(1, 'wizard');
    t.equal(spls[0].name, 'Acid Splash');
    t.equal(spls.length, 41);
    t.end();
});

tap.test('spellsForLevelAndClass 2', t => {
    const spls = manager.spellsForLevelAndClass(6, 'wizard');
    t.equal(spls[0].name, 'Acid Arrow');
    t.equal(spls.length, 100);
    t.end();
});

tap.test('spellsForLevelAndClass 3', t => {
    const spls = manager.spellsForLevelAndClass(0, 'wizard');
    t.equal(spls[0].name, 'Acid Splash');
    t.equal(spls.length, 14);
    t.end();
});

tap.test('spellsForPlayer', t => {
    const spls = manager.spellsForPlayer({
        level: 1,
        class: 'wizard',
    });
    t.equal(spls[0].name, 'Acid Splash');
    t.equal(spls[1].name, 'Alarm');
    t.equal(spls.length, 41);
    t.end();
});

tap.test('spellsForPlayer: level 2 spells', t => {
    const spls = manager.spellsForPlayer({
        level: 2,
        class: 'wizard',
    });
    t.equal(spls[0].name, 'Acid Splash');
    t.equal(spls[1].name, 'Alarm');
    t.equal(spls.length, 41);
    t.end();
});
