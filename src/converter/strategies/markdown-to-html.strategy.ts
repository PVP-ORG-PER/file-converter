import { IConversionStrategy } from './conversion-strategy.interface';
import { marked } from 'marked';

export class MarkdownToHTMLStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const markdownText = input.toString('utf-8');
    const html = await marked(markdownText);
    return Buffer.from(html, 'utf-8');
  }
}
