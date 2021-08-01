import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStroke } from '../interfaces/stroke.interface';
import { Stroke } from '../schemas/stroke.schema';
import { CreateStrokeDTO } from '../dtos/create-stroke.dto';
import { IStrokeByLanguage } from '../interfaces/stroke-language.interface';
import { ListByLanguageDTO } from '../dtos/list-by-language.dto';
import { SearchDTO } from '../dtos/search.dto';

@Injectable()
export class StrokesService {
  constructor(
    @InjectModel(Stroke.name) private readonly strokeModel: Model<Stroke>,
  ) {}

  public async list(): Promise<IStroke[]> {
    return this.strokeModel.find().lean();
  }

  public async listByLanguage(
    query: ListByLanguageDTO,
  ): Promise<IStrokeByLanguage[]> {
    const strokes = await this.list();

    const { language } = query;

    return strokes.map((stroke) => ({
      ...stroke,
      origin: stroke.origin[language],
      meanings: stroke.meanings[language],
    }));
  }

  public async search(query: SearchDTO): Promise<IStroke[]> {
    return this.strokeModel
      .find({
        $text: { $search: query.term },
      })
      .limit(10)
      .lean();
  }

  public async create(model: CreateStrokeDTO): Promise<Stroke> {
    return this.strokeModel.create(model);
  }

  public async update(
    strokeId: string,
    model: CreateStrokeDTO,
  ): Promise<Stroke> {
    return this.strokeModel.findByIdAndUpdate(strokeId, model, {
      new: true,
      useFindAndModify: false,
    });
  }

  public async delete(strokeId: string): Promise<Stroke> {
    const stroke = await this.strokeModel.findByIdAndDelete(strokeId).exec();

    if (!stroke) {
      throw new NotFoundException('stroke-not-found');
    }

    return stroke;
  }
}
