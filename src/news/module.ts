// news.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsService } from './service';
import { NewsController } from './controller';
import { News, NewsSchema } from '../schemas/news.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
