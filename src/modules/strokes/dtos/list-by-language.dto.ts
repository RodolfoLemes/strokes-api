import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { enLanguages } from 'src/modules/common/enums/language.enums';

const languages = Object.keys(enLanguages);

export class ListByLanguageDTO {
  @IsIn(languages)
  @IsOptional()
  @ApiProperty({
    required: false,
    default: 'pt',
    enum: languages,
  })
  public language = 'pt';
}
