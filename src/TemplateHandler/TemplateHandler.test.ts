import { describe, it, expect } from '@jest/globals';
import TemplateHandler from './TemplateHandler';
import { TemplateHandlerConstructorParams } from './types';

const getTemplateHandler = (
  params: Partial<TemplateHandlerConstructorParams> = {},
) => new TemplateHandler({
  template: '[blanker_name].scss',
  data: {
    blanker_name: 'SomeComponent',
  },
  hashEdges: ['[', ']'],
  ...params,
});

describe('TemplateHandler', () => {
  it('Should replace hashes', () => {
    const handler = getTemplateHandler();

    expect(handler.replaceHashes()).toBe('SomeComponent.scss');
  });

  it('Should use other hash edges', () => {
    const handler = getTemplateHandler({
      hashEdges: ['{{', '}}'],
      template: '{{blanker_name}}',
    });

    expect(handler.replaceHashes()).toBe('SomeComponent');
  });

  it('Should not change hash, if there is not value in data', () => {
    const handler = getTemplateHandler({
      // @ts-expect-error: blanker_name should expect string, but it can be undefined by accident
      data: { blanker_name: undefined },
    });

    expect(handler.replaceHashes()).toBe('[blanker_name].scss');
  });

  it('Should not change hash, if there is not hash in data', () => {
    const handler = getTemplateHandler({
      data: {},
    });

    expect(handler.replaceHashes()).toBe('[blanker_name].scss');
  });

  it('Should use formatters', () => {
    const toUpper = (template: string) => template.toUpperCase();
    const handler = getTemplateHandler({
      formatters: { toUpper },
      template: '[blanker_name:toUpper]',
    });

    expect(handler.replaceHashes()).toBe('SOMECOMPONENT');
  });

  it('Should throw error, if formatter does not exist', () => {
    const handler = getTemplateHandler({ template: '[blanker_name:unknownFormatter]' });
    expect(() => handler.replaceHashes()).toThrow('Formatter "unknownFormatter" does not exist');
  });
});
