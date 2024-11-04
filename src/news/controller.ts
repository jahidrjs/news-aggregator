// news.controller.ts
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { NewsService } from './service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('fetch')
  async fetchNews(@Body('feedUrls') feedUrls: string[]) {
    await this.newsService.fetchAndStoreNews(feedUrls);
    return { message: 'News fetched and stored successfully' };
  }

  @Get('filter')
  async filterNews(
    @Query('keywords') keywords: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.newsService.filterNews(keywords, startDate, endDate);
  }
}
