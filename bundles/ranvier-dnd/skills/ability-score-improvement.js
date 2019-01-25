'use strict';

module.exports = srcPath => {
    const SkillType = require(srcPath + 'SkillType');

    return {
        name: 'Ability Score Improvement',
        type: SkillType.SKILL,

        run: state => function(args, player) {},

        info: player => {
            return ``;
        },
    };
};
