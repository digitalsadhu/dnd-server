const assert = require('assert');
const features = require(`${__dirname}/dnd-resource-files/features.json`);

module.exports = class FeatureManager {
    featureByName(name = '') {
        assert(typeof name === 'string', 'a valid feature name is required');

        const feats = features.filter(
            feat => feat.name.toLowerCase() === name.toLowerCase()
        );

        if (!feats[0]) return {};

        return feats[0];
    }

    featuresByLevel(level) {
        assert(typeof level === 'number', 'a valid feature level is required');

        const feats = features.filter(feat => feat.level === level);

        return feats;
    }

    featuresForClass(characterClass) {
        assert(
            typeof characterClass === 'string',
            'a valid character class is required'
        );

        const feats = features.filter(
            feat =>
                feat.class.name.toLowerCase() === characterClass.toLowerCase()
        );

        return feats;
    }

    featuresForSubClass(subClass) {
        assert(
            typeof subClass === 'string',
            'a valid character subclass is required'
        );

        const feats = features.filter(feat => {
            if (!feat.subclass.name) return false;
            return feat.subclass.name.toLowerCase() === subClass.toLowerCase();
        });

        return feats;
    }

    featuresForLevelClassAndSubClass(level, cclass = '', subclass = '') {
        assert(level, 'a valid player level is required');
        assert(cclass, 'a valid player class is required');

        const feats = features.filter(feat => {
            const levelClassMatch =
                feat.class.name.toLowerCase() === cclass.toLowerCase() &&
                feat.level <= level;

            // feature not bound to a subclass
            if (levelClassMatch && !feat.subclass.name) {
                return true;
            }

            // player does not have the necessary subclass
            if (!subclass) return false;

            if (
                levelClassMatch &&
                feat.subclass.name.toLowerCase() === subclass.toLowerCase()
            ) {
                return true;
            }
        });

        return feats;
    }

    featuresForPlayer(player) {
        assert(player, 'a valid player is required');
        assert(player.level, 'player must include a level');
        assert(player.class, 'player must include a class');

        return this.featuresForLevelClassAndSubClass(
            player.level,
            player.class,
            player.subclass
        );
    }
};
