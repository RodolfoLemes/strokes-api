import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IStroke } from '../interfaces/stroke.interface';
import { MeaningsDTO } from './meanings.dto';
import { IMeanings } from '../interfaces/meanings.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStrokeDTO implements IStroke {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String })
  public symbol: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: String })
  public pinyin: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  public origin: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MeaningsDTO)
  @ApiProperty({ required: false })
  public meanings: IMeanings;
}
