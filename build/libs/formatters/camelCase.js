"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = void 0;
const utils_1 = require("./utils");
const camelCase = (value) => (0, utils_1.splitIntoWords)(value)
    .map((word, index) => index === 0
    ? word.toLowerCase()
    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map