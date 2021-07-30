import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Eu amo gatos"', () => {
      const appController = app.get<HealthcheckController>(
        HealthcheckController,
      );
      expect(appController.getHello()).toBe('Eu amo gatos');
    });
  });
});
