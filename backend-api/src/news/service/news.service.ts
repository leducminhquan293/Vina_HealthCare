import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from '../schema/news.schema';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return createdNews.save();
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find().sort({ created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<News | null> {
    return this.newsModel.findById(id).exec();
  }

  async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News | null> {
    return this.newsModel.findByIdAndUpdate(id, updateNewsDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.newsModel.findByIdAndDelete(id).exec();
  }
} 