"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatters = {
    kebabCase(value) {
        return value
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    },
};
exports.default = formatters;
//# sourceMappingURL=formatters.js.map