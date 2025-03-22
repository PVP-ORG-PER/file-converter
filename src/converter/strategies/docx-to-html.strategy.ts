import { IConversionStrategy } from './conversion-strategy.interface';
import * as mammoth from 'mammoth';

export class DocxToHTMLStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const result = await mammoth.convertToHtml({ buffer: input });
    return Buffer.from(result.value, 'utf-8');
  }
}
