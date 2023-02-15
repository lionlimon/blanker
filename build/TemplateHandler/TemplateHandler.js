"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatters_1 = __importDefault(require("./formatters"));
class TemplateHandler {
    constructor(params) {
        this.formatters = formatters_1.default;
        this.template = params.template;
        this.output = params.template;
        this.data = params.data;
        this.hashEdges = params.hashEdges;
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
                let value = String(this.data[leftPart]);
                if (formatter in this.formatters) {
                    value = this.formatters[formatter](value);
                }
                hashValueRecord[hashInner] = value;
            }
            else {
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
exports.default = TemplateHandler;
//# sourceMappingURL=TemplateHandler.js.map