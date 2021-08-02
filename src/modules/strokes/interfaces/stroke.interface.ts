import { ILanguage } from '../../common/interfaces/language.interface';

export type Origin = ILanguage<string>;
export type Meanings = ILanguage<string[]>;

export interface IStroke {
  symbol: string;
  pinyin: string;
  origin: Origin;
  meanings: Meanings;
  file: string;
}
