import { IConversionStrategy } from './conversion-strategy.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as htmlPdf from 'html-pdf';

export class HTMLToPDFStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const html = input.toString('utf-8');
    return new Promise((resolve, reject) => {
      htmlPdf
        .create(html)
        .toBuffer((err: Error | null, buffer: Buffer | null) => {
          if (err) {
            return reject(
              new HttpException(
                `Conversion failed: ${err.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          if (!buffer) {
            return reject(
              new HttpException(
                'Conversion failed: Buffer is null',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }
          resolve(buffer);
        });
    });
  }
}
