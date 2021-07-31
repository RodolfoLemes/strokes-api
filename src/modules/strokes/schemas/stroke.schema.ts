import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IStroke } from '../interfaces/stroke.interface';
import { ILanguage } from '../../common/interfaces/language.interface';

@Schema({ timestamps: true })
export class Stroke extends Document implements IStroke {
  @Prop({ unique: true, required: true })
  public symbol: string;

  @Prop({ required: true })
  public pinyin: string;

  @Prop(
    raw({
      pt: String,
      en: String,
    }),
  )
  public origin: ILanguage<string>;

  @Prop(
    raw({
      pt: { type: [String] },
      en: { type: [String] },
    }),
  )
  public meanings: ILanguage<string[]>;
}

export const StrokeSchema = SchemaFactory.createForClass(Stroke);
