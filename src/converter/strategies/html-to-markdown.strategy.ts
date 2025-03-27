import { IConversionStrategy } from './conversion-strategy.interface';
import TurndownService from 'turndown';

export class HTMLToMarkdownStrategy implements IConversionStrategy {
  async convert(input: Buffer): Promise<Buffer> {
    const html = input.toString('utf-8');
    const turndownService = new TurndownService();
    const markdown = await turndownService.turndown(html);
    return Buffer.from(markdown, 'utf-8');
  }
}
