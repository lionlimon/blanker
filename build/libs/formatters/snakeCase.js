"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = void 0;
const utils_1 = require("./utils");
const snakeCase = (value) => (0, utils_1.splitIntoWords)(value)
    .map(word => word.toLowerCase())
    .join('_');
exports.snakeCase = snakeCase;
//# sourceMappingURL=snakeCase.js.map