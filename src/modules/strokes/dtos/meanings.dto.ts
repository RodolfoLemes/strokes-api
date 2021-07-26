import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray } from 'class-validator';
import { IMeanings } from '../interfaces/meanings.interface';

export class MeaningsDTO implements IMeanings {
  @IsArray()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public pt: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public en: string[];
}
