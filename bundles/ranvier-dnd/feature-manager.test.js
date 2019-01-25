'use strict';

const tap = require('tap');
const FeatureManager = require('./feature-manager');

const manager = new FeatureManager();

tap.test('featureByName 1', t => {
    const feat = manager.featureByName('rage');
    t.equal(feat.name, 'Rage');
    t.end();
});

tap.test('featureByName 2', t => {
    const feat = manager.featureByName('unarmored defense');
    t.equal(feat.name, 'Unarmored Defense');
    t.end();
});

tap.test('featuresByLevel', t => {
    const feats = manager.featuresByLevel(1);
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForClass', t => {
    const feats = manager.featuresForClass('barbarian');
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForSubClass', t => {
    const feats = manager.featuresForSubClass('berserker');
    t.equal(feats[0].name, 'Frenzy');
    t.end();
});

tap.test('featuresForLevelClassAndSubClass', t => {
    const feats = manager.featuresForLevelClassAndSubClass(
        1,
        'barbarian',
        'berserker'
    );
    t.equal(feats[0].name, 'Rage');
    t.end();
});

tap.test('featuresForPlayer', t => {
    const feats = manager.featuresForPlayer({
        level: 1,
        class: 'barbarian',
        subclass: 'berserker',
    });
    t.equal(feats[0].name, 'Rage');
    t.equal(feats[1].name, 'Unarmored Defense');
    t.equal(feats.length, 2);
    t.end();
});

tap.test('featuresForPlayer: level 2 features', t => {
    const feats = manager.featuresForPlayer({
        level: 2,
        class: 'wizard',
    });
    t.equal(feats[0].name, 'Spellcasting');
    t.equal(feats[1].name, 'Arcane Recovery');
    t.equal(feats[2].name, 'Arcane Tradition');
    t.equal(feats.length, 3);
    t.end();
});

tap.test('featuresForPlayer: level 2 features with subclass', t => {
    const feats = manager.featuresForPlayer({
        level: 2,
        class: 'wizard',
        subclass: 'evocation',
    });
    t.equal(feats[0].name, 'Spellcasting');
    t.equal(feats[1].name, 'Arcane Recovery');
    t.equal(feats[2].name, 'Arcane Tradition');
    t.equal(feats[3].name, 'Evocation Savant');
    t.equal(feats[4].name, 'Sculpt Spells');
    t.equal(feats.length, 5);
    t.end();
});
