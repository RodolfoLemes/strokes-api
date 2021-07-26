import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IStroke } from '../interfaces/stroke.interface';
import { IMeanings } from '../interfaces/meanings.interface';

@Schema({ timestamps: true })
export class Stroke extends Document implements IStroke {
  @Prop({ unique: true, required: true })
  public symbol: string;

  @Prop({ required: true })
  public pinyin: string;

  @Prop()
  public origin: string;

  @Prop(
    raw({
      pt: { type: [String] },
      en: { type: [String] },
    }),
  )
  public meanings: IMeanings;
}

export const StrokeSchema = SchemaFactory.createForClass(Stroke);
