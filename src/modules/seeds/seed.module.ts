import { Module } from '@nestjs/common';
import { StrokesModule } from '../strokes/strokes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stroke, StrokeSchema } from '../strokes/schemas/stroke.schema';
import { StrokesSeed } from './services/strokes.seed';
import { SeedsService } from './services/seeds.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stroke.name, schema: StrokeSchema }]),
    StrokesModule,
  ],
  providers: [SeedsService, StrokesSeed],
})
export class SeedsModule {}
