import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StrokesService } from '../services/strokes.service';
import { IStroke } from '../interfaces/stroke.interface';
import { CreateStrokeDTO } from '../dtos/create-stroke.dto';
import { Stroke } from '../schemas/stroke.schema';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('strokes')
@Controller('strokes')
export class StrokesController {
  constructor(private strokesService: StrokesService) {}

  @Get()
  @ApiOkResponse({ description: 'Return a list of strokes' })
  public async list(): Promise<IStroke[]> {
    return this.strokesService.list();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Return a created stroke' })
  public async create(@Body() model: CreateStrokeDTO): Promise<Stroke> {
    return this.strokesService.create(model);
  }

  @Put(':strokeId')
  @ApiOkResponse({ description: 'Return a updated of strokes' })
  public async update(
    @Param('strokeId') strokeId: string,
    model: CreateStrokeDTO,
  ): Promise<Stroke> {
    return this.strokesService.update(strokeId, model);
  }

  @Delete(':strokeId')
  @ApiOkResponse({ description: 'Return a list of strokes' })
  @ApiNotFoundResponse({ description: 'stroke-not-found' })
  public async delete(@Param('strokeId') strokeId: string): Promise<Stroke> {
    return this.strokesService.delete(strokeId);
  }
}
