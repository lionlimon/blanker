"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalCase = void 0;
const utils_1 = require("./utils");
const pascalCase = (value) => (0, utils_1.splitIntoWords)(value)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
exports.pascalCase = pascalCase;
//# sourceMappingURL=pascalCase.js.map