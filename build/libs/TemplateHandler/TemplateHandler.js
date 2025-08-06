"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateHandler = void 0;
const formatters_1 = require("./formatters");
class TemplateHandler {
    constructor(params) {
        this.formatters = formatters_1.formatters;
        this.template = params.template;
        this.output = params.template;
        this.data = params.data;
        this.hashEdges = params.hashEdges;
        if (params.formatters) {
            this.formatters = { ...this.formatters, ...params.formatters };
        }
        const [prf, pst] = this.hashEdges;
        this.regExToFindHashes = new RegExp(`(?<=\\${prf})(.*?)(?=\\${pst})`, 'g');
    }
    findHashes() {
        return Array.from(this.output.matchAll(this.regExToFindHashes));
    }
    prepareHashValueRecord() {
        const hashValueRecord = {};
        const hashes = this.findHashes();
        hashes.forEach(([hashInner]) => {
            if (!hashInner)
                return;
            if (hashValueRecord[hashInner])
                return;
            if (hashInner.includes(':')) {
                const [leftPart, formatter] = hashInner.split(':');
                if (!this.data[leftPart])
                    return;
                if (!this.formatters[formatter]) {
                    throw new Error(`Formatter "${formatter}" does not exist`);
                }
                let value = String(this.data[leftPart]);
                if (formatter in this.formatters) {
                    value = this.formatters[formatter](value);
                }
                hashValueRecord[hashInner] = value;
            }
            else {
                if (!this.data[hashInner])
                    return;
                hashValueRecord[hashInner] = String(this.data[hashInner]);
            }
        });
        return hashValueRecord;
    }
    replaceHashes() {
        const hashValuesRecord = this.prepareHashValueRecord();
        for (const [hash, value] of Object.entries(hashValuesRecord)) {
            this.output = this.output.replaceAll(this.hashEdges[0] + hash + this.hashEdges[1], value);
        }
        return this.output;
    }
}
exports.TemplateHandler = TemplateHandler;
//# sourceMappingURL=TemplateHandler.js.map