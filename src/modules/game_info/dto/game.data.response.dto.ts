import { ApiProperty } from "@nestjs/swagger";

export class GameResponseDto {
  [key: string]: number;

  constructor(gameObject: { [key: string]: number }) {
    for (const key in gameObject) {
      if (gameObject.hasOwnProperty(key)) {
        this[key] = gameObject[key];
      }
    }
  }
}

export class GameProfitObj {
  @ApiProperty()
  betAmount: number;

  @ApiProperty()
  payout: number;

  @ApiProperty()
  profit: number;
}

export class GameProfitResponseDto {
  [key: string]: GameProfitObj;

  constructor(gameData: any[]) {
    for (const item of gameData) {
      const { month, betAmount, payout, profit } = item;
      const gameProfitObj = new GameProfitObj();
      gameProfitObj.betAmount = betAmount;
      gameProfitObj.payout = payout;
      gameProfitObj.profit = profit;
      this[month] = gameProfitObj;
    }
  }
}
