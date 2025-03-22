import { IConversionStrategy } from './conversion-strategy.interface';
import TurndownService from 'turndown';

export class HTMLToMarkdownStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const html = input.toString('utf-8');
    let markdown = '';

    try {
      const turndownService = new TurndownService();
      if (typeof turndownService.turndown === 'function') {
        markdown = turndownService.turndown(html);
      } else {
        throw new Error('TurndownService.turndown is not a function');
      }
    } catch (error) {
      throw new Error(`Failed to convert HTML to Markdown: ${error.message}`);
    }

    return Buffer.from(markdown, 'utf-8');
  }
}
