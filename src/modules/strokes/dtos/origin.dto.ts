import { IsString, IsOptional } from 'class-validator';
import { Origin } from '../interfaces/stroke.interface';
import { ApiProperty } from '@nestjs/swagger';

export class OriginDTO implements Origin {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, type: String })
  public pt: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, type: String })
  public en: string;
}
