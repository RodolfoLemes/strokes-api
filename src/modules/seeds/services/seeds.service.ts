import { Injectable, OnModuleInit } from '@nestjs/common';
import { StrokesSeed } from './strokes.seed';

@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(private readonly strokesSeed: StrokesSeed) {}

  async onModuleInit() {
    await this.strokesSeed.execute();
  }
}
