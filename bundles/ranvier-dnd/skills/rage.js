'use strict';

module.exports = srcPath => {
    const SkillType = require(srcPath + 'SkillType');

    return {
        name: 'Rage',
        type: SkillType.SKILL,
        resource: {
            attribute: 'rage point',
            cost: 1,
        },
        duration: '1 minute (10 rounds)',

        run: state => function(args, player) {},

        info: player => {
            return `As a bonus action enter a rage for up to 1 minute (10 rounds). You gain advantage on STR checks and saving throws (not attacks), +2 melee damage with STR weapons, resistance to bludgeoning, piercing, slashing damage. You can't cast or concentrate on spells while raging. Your rage ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage as a bonus action.`;
        },
    };
};
