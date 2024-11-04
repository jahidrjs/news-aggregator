// schemas/news.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pubDate: Date;

  @Prop({ required: true })
  sourceUrl: string;

  @Prop([String])
  topics: string[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
