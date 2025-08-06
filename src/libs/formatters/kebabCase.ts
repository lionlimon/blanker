import { splitIntoWords } from './utils';

export const kebabCase = (value: string) => splitIntoWords(value)
  .map(word => word.toLowerCase())
  .join('-');
