import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString } from 'class-validator';

export class SearchDTO {
  @IsString()
  @MinLength(2)
  @ApiProperty({ required: true, description: 'Term to search by' })
  public term: string;
}
