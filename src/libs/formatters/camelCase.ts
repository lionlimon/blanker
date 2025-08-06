import { splitIntoWords } from './utils';

export const camelCase = (value: string) => splitIntoWords(value)
  .map((word, index) => index === 0
    ? word.toLowerCase()
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
  .join('');
