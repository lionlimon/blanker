"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIntoWords = void 0;
const splitIntoWords = (value) => {
    return value
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0);
};
exports.splitIntoWords = splitIntoWords;
//# sourceMappingURL=utils.js.map