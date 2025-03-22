import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConversionStrategyFactory } from './conversion-strategy.factory';
import { SUPPORTED_FORMATS } from './mime-types';

@Injectable()
export class ConverterService {
  private readonly logger = new Logger(ConverterService.name);

  async convert(fileBuffer: Buffer, from: string, to: string): Promise<Buffer> {
    if (!SUPPORTED_FORMATS.includes(from) || !SUPPORTED_FORMATS.includes(to)) {
      this.logger.warn(`Unsupported format: ${from} or ${to}`);
      throw new HttpException('Unsupported format', HttpStatus.BAD_REQUEST);
    }

    if (from === to) {
      this.logger.log(`Conversion is not required for ${from} format`);
      return fileBuffer;
    }

    this.logger.log(`Initiating conversion from ${from} to ${to}`);

    try {
      const strategy = ConversionStrategyFactory.getStrategy(from, to);
      const convertedBuffer = await strategy.convert(fileBuffer);
      this.logger.log(`Conversion from ${from} to ${to} completed`);
      return convertedBuffer;
    } catch (error) {
      this.logger.error(
        `Fallo en la conversión: from=${from}, to=${to} - ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
