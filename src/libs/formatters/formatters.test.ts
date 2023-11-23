import { describe, expect, it } from '@jest/globals';
import { pascalCase } from './pascalCase';
import { kebabCase } from './kebabCase';
import { camelCase } from './camelCase';

describe('formatters', () => {
  describe('pascalCase', () => {
    it('Should format to PascalCase from kebab-case correctly', () => {
      expect(pascalCase('some-component-name'))
        .toBe('SomeComponentName');
    });

    it('Should format to PascalCase from camelCase correctly', () => {
      expect(pascalCase('someComponentName'))
        .toBe('SomeComponentName');
    });

    it('Should format to PascalCase from PascalCase correctly', () => {
      expect(pascalCase('SomeComponentName'))
        .toBe('SomeComponentName');
    });
  });

  describe('kebabCase', () => {
    it('Should format to kebab-case from camelCase correctly', () => {
      expect(kebabCase('someComponentName'))
        .toBe('some-component-name');
    });

    it('Should format to kebab-case from PascalCase correctly', () => {
      expect(kebabCase('SomeComponentName'))
        .toBe('some-component-name');
    });

    it('Should format to kebab-case from kebab-case correctly', () => {
      expect(kebabCase('some-component-name'))
        .toBe('some-component-name');
    });
  });

  describe('camelCase', () => {
    it('Should format to camelCase from kebab-case correctly', () => {
      expect(camelCase('some-component-name'))
        .toBe('someComponentName');
    });

    it('Should format to camelCase from PascalCase correctly', () => {
      expect(camelCase('SomeComponentName'))
        .toBe('someComponentName');
    });

    it('Should format to camelCase from camelCase correctly', () => {
      expect(camelCase('someComponentName'))
        .toBe('someComponentName');
    });
  });
});
