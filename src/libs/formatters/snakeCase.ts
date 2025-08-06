import { splitIntoWords } from './utils';

export const snakeCase = (value: string) => splitIntoWords(value)
  .map(word => word.toLowerCase())
  .join('_');
