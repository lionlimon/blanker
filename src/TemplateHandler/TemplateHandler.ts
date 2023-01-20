import { TemplateHandlerConstructorParams } from './types';
import formatters from './formatters';

export default class TemplateHandler {
  private template: string;

  output: string;

  private readonly data: Record<string, string>;

  private readonly hashEdges: [string, string];

  private readonly regExToFindHashes: RegExp;

  private readonly formatters = formatters;

  constructor(params: TemplateHandlerConstructorParams) {
    this.template = params.template;
    this.output = params.template;
    this.data = params.data;
    this.hashEdges = params.hashEdges;

    const [prf, pst] = this.hashEdges;

    this.regExToFindHashes = new RegExp(`(?<=\\${prf})(.*?)(?=\\${pst})`, 'g');
  }

  private findHashes() {
    return Array.from(this.output.matchAll(this.regExToFindHashes));
  }

  /**
   * Create hash[value] record with processed values
   */
  private prepareHashValueRecord() {
    const hashValueRecord: Record<string, string> = {};

    const hashes = this.findHashes();

    hashes.forEach(([hash]) => {
      if (hashValueRecord[hash]) return; // such value processed

      if (hash.includes(':')) {
        const [leftPart, formatter] = hash.split(':');
        let value = String(this.data[leftPart]);

        if (formatter in this.formatters) {
          value = this.formatters[formatter](value);
        }

        hashValueRecord[hash] = value;
      } else {
        hashValueRecord[hash] = String(this.data[hash]);
      }
    });

    return hashValueRecord;
  }

  replaceHashes() {
    const hashValuesRecord = this.prepareHashValueRecord();

    for (const [hash, value] of Object.entries(hashValuesRecord)) {
      this.output = this.output.replaceAll(
        this.hashEdges[0] + hash + this.hashEdges[1],
        value,
      );
    }

    return this.output;
  }
}
