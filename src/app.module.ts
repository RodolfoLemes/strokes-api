import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { databaseConfig } from './configs/database.config.';
import { StrokesModule } from './modules/strokes/strokes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(databaseConfig.MONGO_URI, {
      useCreateIndex: true,
    }),
    HealthcheckModule,
    StrokesModule,
  ],
  providers: [],
})
export class AppModule {}
