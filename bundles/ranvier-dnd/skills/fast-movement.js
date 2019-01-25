'use strict';

module.exports = srcPath => {
    const SkillType = require(srcPath + 'SkillType');

    return {
        name: 'Fast Movement',
        type: SkillType.SKILL,

        run: state => function(args, player) {},

        info: player => {
            return ``;
        },
    };
};
