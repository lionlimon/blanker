"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatters = {
    kebabCase(value) {
        return value
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    },
    camelCase(value) {
        return value
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
            .replace(/\s+|-/g, '');
    },
    pascalCase(value) {
        return (value.match(/[a-zA-Z0-9]+/g) || [])
            .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
    },
};
exports.default = formatters;
//# sourceMappingURL=formatters.js.map