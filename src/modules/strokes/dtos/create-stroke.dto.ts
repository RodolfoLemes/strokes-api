import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IStroke, Meanings, Origin } from '../interfaces/stroke.interface';
import { MeaningsDTO } from './meanings.dto';
import { OriginDTO } from './origin.dto';

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
  @ValidateNested({ each: true })
  @Type(() => OriginDTO)
  @ApiProperty({ required: false, type: OriginDTO })
  public origin: Origin;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MeaningsDTO)
  @ApiProperty({ required: false, type: MeaningsDTO })
  public meanings: Meanings;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String })
  public file: string;
}
