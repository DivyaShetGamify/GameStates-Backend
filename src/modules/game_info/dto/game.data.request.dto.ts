import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Games } from 'src/config/constants';

export class GameRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Games)
  gameName: Games;

  @ApiProperty()
  @IsNotEmpty()
  gameInfo: string;
}
