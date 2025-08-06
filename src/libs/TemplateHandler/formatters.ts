import { camelCase, kebabCase, pascalCase, snakeCase } from '../formatters';

export const formatters: Record<string, (value: string) => string> = {
  kebabCase,
  camelCase,
  pascalCase,
  snakeCase,
} as const;
