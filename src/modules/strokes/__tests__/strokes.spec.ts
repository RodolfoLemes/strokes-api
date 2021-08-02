import { Test, TestingModule } from '@nestjs/testing';
import { StrokesController } from '../controllers/strokes.controller';
import { StrokesService } from '../services/strokes.service';
import { strokeDog, strokeCat } from '../mocks/strokes.mock';
import {
  rootMongooseTestModule,
  closeDatabase,
  clearDatabase,
} from '../../../../test/mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Stroke, StrokeSchema } from '../schemas/stroke.schema';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('Strokes Service', () => {
  let strokesModule: TestingModule;
  let strokesController: StrokesController;
  let strokeModel: Model<Stroke>;
  let stroke: Stroke;

  beforeAll(async () => {
    strokesModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Stroke.name, schema: StrokeSchema },
        ]),
      ],
      controllers: [StrokesController],
      providers: [StrokesService],
    }).compile();

    strokesController = strokesModule.get<StrokesController>(StrokesController);
    strokeModel = strokesModule.get<Model<Stroke>>('StrokeModel');

    stroke = await strokeModel.create(strokeDog);
  });

  afterAll(async () => {
    await strokesModule.close();
    await closeDatabase();
  });

  afterEach(async () => await clearDatabase());

  describe('list', () => {
    it('should list the strokes', async () => {
      const strokes = await strokesController.list();
      expect(strokes.length).toBeTruthy();
    });
  });

  describe('list by language', () => {
    it('should list the stroke by language', async () => {
      const strokesByLanguage = await strokesController.listByLanguage({
        language: 'pt',
      });

      expect(strokesByLanguage[0].origin).toBe(stroke.origin.pt);
    });
  });

  describe('search', () => {
    it('should list the strokes by query search', async () => {
      const strokes = await strokesController.search({
        term: 'cachorro',
      });

      expect(strokes[0].meanings.pt[0]).toBe('cachorro');
    });

    it('should list the strokes by partial query', async () => {
      const strokes = await strokesController.search({
        term: 'cachor',
      });

      expect(strokes[0].meanings.pt[0]).toBe('cachorro');
    });
  });

  describe('create', () => {
    it('should create a stroke', async () => {
      const createdStroke = await strokesController.create(strokeCat);

      expect(createdStroke).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update a stroke', async () => {
      const updatedStroke = await strokesController.update(stroke._id, {
        ...strokeCat,
        symbol: 'cat-symbol',
      });

      expect(updatedStroke._id).toEqual(stroke._id);
      expect(updatedStroke.pinyin).toBe(strokeCat.pinyin);
    });
  });

  describe('delete', () => {
    it('should delete a stroke', async () => {
      const deletedStroke = await strokesController.delete(stroke._id);

      expect(deletedStroke).toBeTruthy();
    });

    it('should not delete a stroke with a invalid id', async () => {
      await expect(
        strokesController.delete(Types.ObjectId().toHexString()),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
