"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const pascalCase_1 = require("./pascalCase");
const kebabCase_1 = require("./kebabCase");
const camelCase_1 = require("./camelCase");
const snakeCase_1 = require("./snakeCase");
(0, globals_1.describe)('formatters', () => {
    (0, globals_1.describe)('pascalCase', () => {
        (0, globals_1.it)('Should format to PascalCase from kebab-case correctly', () => {
            (0, globals_1.expect)((0, pascalCase_1.pascalCase)('some-component-name'))
                .toBe('SomeComponentName');
        });
        (0, globals_1.it)('Should format to PascalCase from camelCase correctly', () => {
            (0, globals_1.expect)((0, pascalCase_1.pascalCase)('someComponentName'))
                .toBe('SomeComponentName');
        });
        (0, globals_1.it)('Should format to PascalCase from PascalCase correctly', () => {
            (0, globals_1.expect)((0, pascalCase_1.pascalCase)('SomeComponentName'))
                .toBe('SomeComponentName');
        });
        (0, globals_1.it)('Should format to PascalCase from snake_case correctly', () => {
            (0, globals_1.expect)((0, pascalCase_1.pascalCase)('some_component_name'))
                .toBe('SomeComponentName');
        });
    });
    (0, globals_1.describe)('kebabCase', () => {
        (0, globals_1.it)('Should format to kebab-case from camelCase correctly', () => {
            (0, globals_1.expect)((0, kebabCase_1.kebabCase)('someComponentName'))
                .toBe('some-component-name');
        });
        (0, globals_1.it)('Should format to kebab-case from PascalCase correctly', () => {
            (0, globals_1.expect)((0, kebabCase_1.kebabCase)('SomeComponentName'))
                .toBe('some-component-name');
        });
        (0, globals_1.it)('Should format to kebab-case from kebab-case correctly', () => {
            (0, globals_1.expect)((0, kebabCase_1.kebabCase)('some-component-name'))
                .toBe('some-component-name');
        });
        (0, globals_1.it)('Should format to kebab-case from snake_case correctly', () => {
            (0, globals_1.expect)((0, kebabCase_1.kebabCase)('some_component_name'))
                .toBe('some-component-name');
        });
    });
    (0, globals_1.describe)('camelCase', () => {
        (0, globals_1.it)('Should format to camelCase from kebab-case correctly', () => {
            (0, globals_1.expect)((0, camelCase_1.camelCase)('some-component-name'))
                .toBe('someComponentName');
        });
        (0, globals_1.it)('Should format to camelCase from PascalCase correctly', () => {
            (0, globals_1.expect)((0, camelCase_1.camelCase)('SomeComponentName'))
                .toBe('someComponentName');
        });
        (0, globals_1.it)('Should format to camelCase from camelCase correctly', () => {
            (0, globals_1.expect)((0, camelCase_1.camelCase)('someComponentName'))
                .toBe('someComponentName');
        });
        (0, globals_1.it)('Should format to camelCase from snake_case correctly', () => {
            (0, globals_1.expect)((0, camelCase_1.camelCase)('some_component_name'))
                .toBe('someComponentName');
        });
    });
    (0, globals_1.describe)('snakeCase', () => {
        (0, globals_1.it)('Should format to snake_case from camelCase correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('someComponentName'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from PascalCase correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('SomeComponentName'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from kebab-case correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('some-component-name'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from snake_case correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('some_component_name'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from spaces correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('some component name'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from mixed formats correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('Some-Component Name'))
                .toBe('some_component_name');
        });
        (0, globals_1.it)('Should format to snake_case from uppercase correctly', () => {
            (0, globals_1.expect)((0, snakeCase_1.snakeCase)('HELLO_WORLD'))
                .toBe('hello_world');
        });
    });
});
//# sourceMappingURL=formatters.test.js.map