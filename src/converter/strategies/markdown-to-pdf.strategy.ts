import { IConversionStrategy } from './conversion-strategy.interface';
import { mdToPdf } from 'md-to-pdf';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MarkdownToPDFStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const markdownText = input.toString('utf-8');
    const result = (await mdToPdf({ content: markdownText }, {})) as any;
    if (!result || !result.pdf) {
      throw new HttpException(
        'Conversion failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result.pdf;
  }
}
