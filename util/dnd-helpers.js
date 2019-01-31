'use strict';

const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

let logs = {};

try {
    logs = require(`${__dirname}/../data/game-logs.json`);
} catch (err) {
    // noop
}

class GameLog {
    constructor(gameRoom, message) {
        const roomKey = `${gameRoom.area.name}:${gameRoom.id}`;
        logs[roomKey] = logs[roomKey] || [];
        this.id = logs[roomKey].length;
        logs[roomKey].push({
            id: this.id,
            area: gameRoom.area.name,
            room: gameRoom.id,
            message,
            timestamp: Date.now(),
        });
    }

    save() {
        writeFile(
            `${__dirname}/../data/game-logs.json`,
            JSON.stringify(logs, null, 2)
        ).catch(err => console.error(err));
    }
}

module.exports.GameHistory = class GameHistory {
    constructor(Broadcast, player) {
        this.Broadcast = Broadcast;
        this.player = player;
    }

    printUnread() {
        const bufferedLogs = [];
        const gameRoom = this.player.room;
        const roomKey = `${gameRoom.area.name}:${gameRoom.id}`;
        let lastId = this.player.getMeta(roomKey) || 0;

        if (!logs[roomKey]) {
            this.Broadcast.sayAt(this.player, 'No logs to read');
            return;
        }

        if (lastId > logs[roomKey].length) {
            lastId = 0;
        }

        for (let i = logs[roomKey].length - 1; i >= 0; i--) {
            if (logs[roomKey][i].id > lastId) {
                bufferedLogs.unshift(logs[roomKey][i]);
            }
        }

        for (let log of bufferedLogs) {
            this.Broadcast.sayAt(this.player, log.message);
        }

        if (bufferedLogs.length === 0) {
            this.Broadcast.sayAt(this.player, 'No logs to read');
        } else {
            this.player.setMeta(
                roomKey,
                bufferedLogs[bufferedLogs.length - 1].id
            );
            this.player.save();
        }
    }

    logWithoutSaying(message) {
        // create a GameLog message.
        const log = new GameLog(this.player.room, message);
        log.save();

        const roomKey = `${this.player.room.area.name}:${this.player.room.id}`;

        const targets = this.player.room.getBroadcastTargets();
        // push the message and meta into a structure with id
        // iterate through players and set lastSeenGameLog to the id if the player has caughtUp: true

        const players = targets.filter(t => t.constructor.name === 'Player');

        players.forEach(player => {
            // if the player was up to date with the last message
            // they stay up to date
            // otherwise it will require a called to printUnread() to get them up to date again
            if (player.getMeta(roomKey) === log.id - 1) {
                player.setMeta(roomKey, log.id);
                player.save();
            }
        });

        // the player needs to run the "game logs" command to catch up (set caughtUp: true)
        // once caught up, every message should then set lastSeenGameLog to the message id.
    }

    log(message) {
        this.Broadcast.sayAtExcept(this.player.room, message, [this.player]);

        this.logWithoutSaying(message);
    }
};
