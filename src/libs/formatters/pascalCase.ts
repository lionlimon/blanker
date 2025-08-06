import { splitIntoWords } from './utils';

export const pascalCase = (value: string) => splitIntoWords(value)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join('');
