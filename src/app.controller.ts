import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ConverterService } from './converter/converter.service';
import { Response } from 'express';
import { getMimeType, SUPPORTED_FORMATS } from './converter/mime-types';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly converterService: ConverterService) { }

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Convert a file to another format' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        from: { type: 'string', example: 'md' },
        to: { type: 'string', example: 'pdf' },
      },
    },
  })
  @ApiQuery({ name: 'from', description: 'Origin format', example: 'md' })
  @ApiQuery({ name: 'to', description: 'Destination format', example: 'pdf' })
  @ApiResponse({ status: 201, description: 'File converted successfully' })
  async convertFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('from') from: string,
    @Query('to') to: string,
    @Res() res: Response,
  ) {
    if (!file) {
      this.logger.warn('conversion reuqest without file');
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    if (!from || !to) {
      this.logger.warn('conversion reuqest without from or to');
      throw new HttpException(
        'From and To are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.logger.log(`Conversion request received from ${from} to ${to}`);

    try {
      const convertedBuffer = await this.converterService.convert(
        file.buffer,
        from.toLowerCase(),
        to.toLowerCase(),
      );
      res.set({
        'Content-Type': getMimeType(to),
        'Content-Disposition': `attachment; filename="converted.${to}"`,
      });
      this.logger.log(`Conversion successful: ${from} to ${to}`);
      return res.send(convertedBuffer);
    } catch (error) {
      this.logger.error(
        `Error durante la conversión: from=${from}, to=${to} - ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        `Error durante la conversión: ${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('formats')
  @ApiOperation({ summary: 'Get supported formats' })
  @ApiResponse({
    status: 200,
    description: 'List of supported formats',
    schema: { example: { formats: SUPPORTED_FORMATS } },
  })
  getSupportedFormats() {
    this.logger.log('Supported formats requested');
    return { formats: SUPPORTED_FORMATS };
  }
}
