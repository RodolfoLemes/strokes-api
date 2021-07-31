import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { IStroke } from '../interfaces/stroke.interface';
import { Stroke } from '../schemas/stroke.schema';
import { CreateStrokeDTO } from '../dtos/create-stroke.dto';
import { IStrokeByLanguage } from '../interfaces/stroke-language.interface';
import { ListByLanguageDTO } from '../dtos/list-by-language.dto';

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

    const strokesByLanguage: IStrokeByLanguage[] = strokes.map((stroke) => ({
      ...stroke,
      origin: stroke.origin[language],
      meanings: stroke.meanings[language],
    }));

    return strokesByLanguage;
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
    const stroke = await this.strokeModel.findByIdAndDelete(strokeId);

    if (!stroke) throw new NotFoundError('stroke-not-found');

    return stroke;
  }
}
