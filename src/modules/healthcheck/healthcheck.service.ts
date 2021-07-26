import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  getHello(): string {
    return 'Eu amo gatos';
  }
}
