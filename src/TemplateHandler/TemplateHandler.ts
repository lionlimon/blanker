import { TemplateHandlerConstructorParams } from './types';
import formatters from './formatters';
import * as console from 'console';

export default class TemplateHandler {
  /**
   * Original template
   */
  private template: string;

  /**
   * Template for changing
   */
  output: string;

  /**
   * hash[value] record for replacing in output
   */
  private readonly data: Record<string, string>;

  /**
   * Array with prefix and postfix of hash, '[' and ']' by default
   */
  private readonly hashEdges: [prefix: string, postfix: string];

  /**
   * Regular expression for finding expressions in prefix and postfix ([...])
   */
  private readonly regExToFindHashes: RegExp;

  /**
   * Functions set, that are used in formatters part of hash ([some_name:functionName])
   */
  private readonly formatters = formatters;

  constructor(params: TemplateHandlerConstructorParams) {
    this.template = params.template;
    this.output = params.template;
    this.data = params.data;
    this.hashEdges = params.hashEdges;

    const [prf, pst] = this.hashEdges;

    this.regExToFindHashes = new RegExp(`(?<=\\${prf})(.*?)(?=\\${pst})`, 'g');
  }

  /**
   * Find all hashes in template
   */
  private findHashes() {
    return Array.from(this.output.matchAll(this.regExToFindHashes));
  }

  /**
   * Create hash[value] record with processed values
   */
  private prepareHashValueRecord() {
    const hashValueRecord: Record<string, string> = {};

    const hashes = this.findHashes();

    hashes.forEach(([hashInner]) => {
      if (!hashInner) return; // inner is empty: '[]'
      if (hashValueRecord[hashInner]) return; // such value processed

      if (hashInner.includes(':')) {
        const [leftPart, formatter] = hashInner.split(':');
        let value = String(this.data[leftPart]);

        if (formatter in this.formatters) {
          value = this.formatters[formatter](value);
        }

        hashValueRecord[hashInner] = value;
      } else {
        hashValueRecord[hashInner] = String(this.data[hashInner]);
      }
    });

    return hashValueRecord;
  }

  /**
   * Replace all hashes in output
   */
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
