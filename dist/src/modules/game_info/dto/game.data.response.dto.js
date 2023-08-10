"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResponseDto = void 0;
class GameResponseDto {
    constructor(gameObject) {
        for (const key in gameObject) {
            if (gameObject.hasOwnProperty(key)) {
                this[key] = gameObject[key];
            }
        }
    }
}
exports.GameResponseDto = GameResponseDto;
//# sourceMappingURL=game.data.response.dto.js.map