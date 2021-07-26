import { IMeanings } from './meanings.interface';

export interface IStroke {
  symbol: string;
  pinyin: string;
  origin: string;
  meanings: IMeanings;
}
