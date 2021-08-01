import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ILanguage } from '../../common/interfaces/language.interface';

@Schema()
export class Meanings extends Document implements ILanguage<string[]> {
  @Prop({ index: true, type: String })
  public pt: string[];

  @Prop({ index: true, type: String })
  public en: string[];
}
