"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInfoService = void 0;
const common_1 = require("@nestjs/common");
const gameData_1 = require("../../../gameData");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const constants_1 = require("../../config/constants");
const uuid_1 = require("uuid");
const database_provider_1 = require("../../database/database.provider");
const game_data_response_dto_1 = require("./dto/game.data.response.dto");
let GameInfoService = class GameInfoService {
    constructor(knex) {
        this.knex = knex;
    }
    async create() {
        const seedData = gameData_1.jsonData.map((record) => ({
            id: (0, uuid_1.v4)(),
            month: record.month,
            game: 'God Of Fortune',
            betCount: parseInt(record.betCount),
            playerCount: record.playerCount,
            betAmount: parseFloat(record.betAmount),
            payout: parseFloat(record.payout),
            rtp: parseFloat(record.rtp),
            profit: record.profit,
        }));
        try {
            await this.knex.insert(seedData).into('game_info');
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async findOne(startDate, endDate, game, gameInfo) {
        if (!Object.keys(constants_1.GameInfoType).includes(gameInfo)) {
            throw new common_1.BadRequestException('Requested game info does not exists');
        }
        if (!Object.values(constants_1.Games).includes(game)) {
            throw new common_1.BadRequestException('Game does not exists');
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        if (startDate > formattedDate) {
            throw new common_1.BadRequestException("start Date should be less than today's date");
        }
        if (endDate > formattedDate) {
            throw new common_1.BadRequestException("End Date should be less than today's date");
        }
        const gameData = await this.knex
            .select(gameInfo, 'month')
            .whereBetween('month', [startDate, endDate])
            .andWhere('game', game)
            .from(constants_1.DB_TABLE.GAME_INFO);
        const gameDataObj = gameData.reduce((result, item) => {
            result[item.month] = item[`${gameInfo}`];
            return result;
        }, {});
        return new game_data_response_dto_1.GameResponseDto(gameDataObj);
    }
};
GameInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)(database_provider_1.DB_CONNECTION.GAME_DATA)),
    __metadata("design:paramtypes", [Function])
], GameInfoService);
exports.GameInfoService = GameInfoService;
//# sourceMappingURL=game_info.service.js.map