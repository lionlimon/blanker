"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const TemplateHandler_1 = require("./TemplateHandler");
const getTemplateHandler = (params = {}) => new TemplateHandler_1.TemplateHandler({
    template: '[blanker_name].scss',
    data: {
        blanker_name: 'SomeComponent',
    },
    hashEdges: ['[', ']'],
    ...params,
});
(0, globals_1.describe)('TemplateHandler', () => {
    (0, globals_1.it)('Should replace hashes', () => {
        const handler = getTemplateHandler();
        (0, globals_1.expect)(handler.replaceHashes()).toBe('SomeComponent.scss');
    });
    (0, globals_1.it)('Should use other hash edges', () => {
        const handler = getTemplateHandler({
            hashEdges: ['{{', '}}'],
            template: '{{blanker_name}}',
        });
        (0, globals_1.expect)(handler.replaceHashes()).toBe('SomeComponent');
    });
    (0, globals_1.it)('Should not change hash, if there is not value in data', () => {
        const handler = getTemplateHandler({
            data: { blanker_name: undefined },
        });
        (0, globals_1.expect)(handler.replaceHashes()).toBe('[blanker_name].scss');
    });
    (0, globals_1.it)('Should not change hash, if there is not hash in data', () => {
        const handler = getTemplateHandler({
            data: {},
        });
        (0, globals_1.expect)(handler.replaceHashes()).toBe('[blanker_name].scss');
    });
    (0, globals_1.it)('Should use formatters', () => {
        const toUpper = (template) => template.toUpperCase();
        const handler = getTemplateHandler({
            formatters: { toUpper },
            template: '[blanker_name:toUpper]',
        });
        (0, globals_1.expect)(handler.replaceHashes()).toBe('SOMECOMPONENT');
    });
    (0, globals_1.it)('Should throw error, if formatter does not exist', () => {
        const handler = getTemplateHandler({ template: '[blanker_name:unknownFormatter]' });
        (0, globals_1.expect)(() => handler.replaceHashes()).toThrow('Formatter "unknownFormatter" does not exist');
    });
});
//# sourceMappingURL=TemplateHandler.test.js.map