import { HttpException, HttpStatus } from '@nestjs/common';
import { IConversionStrategy } from './strategies/conversion-strategy.interface';
import { MarkdownToHTMLStrategy } from './strategies/markdown-to-html.strategy';
import { MarkdownToPDFStrategy } from './strategies/markdown-to-pdf.strategy';
import { HTMLToPDFStrategy } from './strategies/html-to-pdf.strategy';
import { HTMLToMarkdownStrategy } from './strategies/html-to-markdown.strategy';
import { DocxToHTMLStrategy } from './strategies/docx-to-html.strategy';
import { CompositeConversionStrategy } from './strategies/composite-conversion.strategy';

export class ConversionStrategyFactory {
  static getStrategy(from: string, to: string): IConversionStrategy {
    if (from === to) {
      throw new HttpException(
        'Same format conversion is not supported',
        HttpStatus.BAD_REQUEST,
      );
    }
    switch (from) {
      case 'md':
        if (to === 'html') return new MarkdownToHTMLStrategy();
        if (to === 'pdf') return new MarkdownToPDFStrategy();
        break;
      case 'html':
        if (to === 'pdf') return new HTMLToPDFStrategy();
        if (to === 'md') return new HTMLToMarkdownStrategy();
        break;
      case 'docx':
        if (to === 'html') return new DocxToHTMLStrategy();
        if (to === 'pdf')
          return new CompositeConversionStrategy([
            new DocxToHTMLStrategy(),
            new HTMLToPDFStrategy(),
          ]);
        if (to === 'md')
          return new CompositeConversionStrategy([
            new DocxToHTMLStrategy(),
            new HTMLToMarkdownStrategy(),
          ]);
        break;
      default:
        break;
    }
    throw new HttpException(
      `Conversión de ${from} a ${to} no implementada`,
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
