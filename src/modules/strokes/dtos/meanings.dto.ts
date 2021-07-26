import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { IMeanings } from '../interfaces/meanings.interface';

export class MeaningsDTO implements IMeanings {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public pt: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public en: string[];
}
