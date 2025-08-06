import { describe, expect, it } from '@jest/globals';
import { pascalCase } from './pascalCase';
import { kebabCase } from './kebabCase';
import { camelCase } from './camelCase';
import { snakeCase } from './snakeCase';

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

    it('Should format to PascalCase from snake_case correctly', () => {
      expect(pascalCase('some_component_name'))
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

    it('Should format to kebab-case from snake_case correctly', () => {
      expect(kebabCase('some_component_name'))
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

    it('Should format to camelCase from snake_case correctly', () => {
      expect(camelCase('some_component_name'))
        .toBe('someComponentName');
    });
  });

  describe('snakeCase', () => {
    it('Should format to snake_case from camelCase correctly', () => {
      expect(snakeCase('someComponentName'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from PascalCase correctly', () => {
      expect(snakeCase('SomeComponentName'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from kebab-case correctly', () => {
      expect(snakeCase('some-component-name'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from snake_case correctly', () => {
      expect(snakeCase('some_component_name'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from spaces correctly', () => {
      expect(snakeCase('some component name'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from mixed formats correctly', () => {
      expect(snakeCase('Some-Component Name'))
        .toBe('some_component_name');
    });

    it('Should format to snake_case from uppercase correctly', () => {
      expect(snakeCase('HELLO_WORLD'))
        .toBe('hello_world');
    });
  });
});
