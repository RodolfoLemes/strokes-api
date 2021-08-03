import { InjectModel } from '@nestjs/mongoose';
import { Stroke } from '../../strokes/schemas/stroke.schema';
import { Model } from 'mongoose';
import * as strokes from '../charges/strokes.json';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StrokesSeed {
  constructor(
    @InjectModel(Stroke.name) private readonly strokeModel: Model<Stroke>,
  ) {}

  public async execute(): Promise<void> {
    const hasStrokes = await this.strokeModel.countDocuments({}).exec();

    if (hasStrokes) {
      return;
    }

    await Promise.all(strokes.map((stroke) => this.strokeModel.create(stroke)));
  }
}
