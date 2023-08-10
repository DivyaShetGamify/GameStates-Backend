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
