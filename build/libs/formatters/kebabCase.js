"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCase = void 0;
const utils_1 = require("./utils");
const kebabCase = (value) => (0, utils_1.splitIntoWords)(value)
    .map(word => word.toLowerCase())
    .join('-');
exports.kebabCase = kebabCase;
//# sourceMappingURL=kebabCase.js.map