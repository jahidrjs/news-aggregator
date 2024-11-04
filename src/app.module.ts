import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Uses the MONGODB_URI from .env
    ScheduleModule.forRoot(),
    NewsModule,
  ],
})
export class AppModule {}
