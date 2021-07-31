import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray } from 'class-validator';
import { Meanings } from '../interfaces/stroke.interface';

export class MeaningsDTO implements Meanings {
  @IsArray()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public pt: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: true, type: [String] })
  public en: string[];
}
