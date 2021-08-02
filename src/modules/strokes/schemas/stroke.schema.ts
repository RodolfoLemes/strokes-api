import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IStroke } from '../interfaces/stroke.interface';
import { ILanguage } from '../../common/interfaces/language.interface';
import { Meanings } from './meanings.schema';

@Schema({ timestamps: true })
export class Stroke extends Document implements IStroke {
  @Prop({ unique: true, required: true })
  public symbol: string;

  @Prop({ required: true, index: true })
  public pinyin: string;

  @Prop(
    raw({
      pt: String,
      en: String,
    }),
  )
  public origin: ILanguage<string>;

  @Prop({ type: Meanings })
  public meanings: Meanings;

  @Prop()
  public file: string;
}

export const StrokeSchema = SchemaFactory.createForClass(Stroke);

StrokeSchema.index({
  pinyin: 'text',
  'meanings.pt': 'text',
  'meanings.en': 'text',
});
