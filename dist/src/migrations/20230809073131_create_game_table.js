"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw(`CREATE TABLE \`game_data\`.\`game_stats\` (id CHAR(36) PRIMARY KEY, month VARCHAR(12) NOT NULL, game CHAR(50) NOT NULL, betCount BIGINT NOT NULL,  playerCount BIGINT NOT NULL, betAmount FLOAT NOT NULL, payout FLOAT NOT NULL, rtp FLOAT NOT NULL, profit FLOAT NOT NULL, createdAt datetime(6) DEFAULT CURRENT_TIMESTAMP(6), updatedAt datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6));`);
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20230809073131_create_game_table.js.map