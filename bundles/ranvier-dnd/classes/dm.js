'use strict';

module.exports = srcPath => {
    return {
        name: 'Dungeon Master',
        description: 'The Master of the Dungeon',
        abilityTable: {},

        initPlayer: (state, player) => {},

        setupPlayer: (state, player) => {
            player.prompt = '';
        },
    };
};
