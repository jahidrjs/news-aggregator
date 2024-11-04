// news.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../schemas/news.schema';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import {
  ComprehendClient,
  DetectEntitiesCommand,
} from '@aws-sdk/client-comprehend';

@Injectable()
export class NewsService {
  private parser = new Parser();
  private logger = new Logger(NewsService.name);

  private comprehendClient: ComprehendClient; // Define comprehendClient as a property

  constructor(@InjectModel(News.name) private newsModel: Model<News>) {
    // Initialize the ComprehendClient with appropriate configuration
    this.comprehendClient = new ComprehendClient({ region: 'us-east-1' }); // Adjust the AWS region as necessary
  }

  async fetchAndStoreNews(feedUrls: string[]): Promise<void> {
    for (const url of feedUrls) {
      try {
        const feed = await this.parser.parseURL(url);
        for (const item of feed.items) {
          await this.storeNews({
            title: item.title,
            description: item.contentSnippet || '',
            pubDate: new Date(item.pubDate),
            sourceUrl: item.link,
          });
        }
      } catch (error) {
        this.logger.error(`Error fetching data from ${url}: ${error.message}`);
      }
    }
  }

  private async storeNews(articleData): Promise<void> {
    const existingArticle = await this.newsModel.findOne({
      title: articleData.title,
    });
    if (!existingArticle) {
      const topics = await this.extractTopics(articleData.description);
      const newsArticle = new this.newsModel({ ...articleData, topics });
      await newsArticle.save();
    }
  }

  async extractTopics(content: string): Promise<string[]> {
    try {
      const response = await axios.post(
        'https://language.googleapis.com/v1/documents:analyzeEntities',
        {
          document: {
            type: 'PLAIN_TEXT',
            content: content,
          },
          encodingType: 'UTF8',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_GOOGLE_CLOUD_API_KEY`,
          },
        },
      );
      return response.data.entities.map((entity) => entity.name);
    } catch (error) {
      this.logger.error('Error extracting topics:', error.message);
      return [];
    }
  }

  async filterNews(keywords?: string, startDate?: string, endDate?: string) {
    const query: any = {};

    if (keywords) {
      query.title = { $regex: keywords, $options: 'i' }; // Case-insensitive keyword search
    }

    if (startDate || endDate) {
      query.publicationDate = {};
      if (startDate) {
        query.publicationDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.publicationDate.$lte = new Date(endDate);
      }
    }

    return this.newsModel.find(query).exec();
  }
  // Method to identify named entities in the text
  async identifyEntities(text: string) {
    const command = new DetectEntitiesCommand({
      Text: text,
      LanguageCode: 'en',
    });

    const response = await this.comprehendClient.send(command);
    return response.Entities?.map((entity) => ({
      type: entity.Type,
      text: entity.Text,
    }));
  }

  async saveArticleWithEntities(article) {
    const entities = await this.identifyEntities(article.description); // Assuming description holds article text
    const articleWithEntities = { ...article, entities };
    return this.newsModel.create(articleWithEntities);
  }
}
