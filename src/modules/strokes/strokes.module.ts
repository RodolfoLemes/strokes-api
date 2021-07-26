import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stroke, StrokeSchema } from './schemas/stroke.schema';
import { StrokesController } from './controllers/strokes.controller';
import { StrokesService } from './services/strokes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stroke.name, schema: StrokeSchema }]),
  ],
  controllers: [StrokesController],
  providers: [StrokesService],
})
export class StrokesModule {}
