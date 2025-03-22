import { IConversionStrategy } from './conversion-strategy.interface';

export class CompositeConversionStrategy implements IConversionStrategy {
  private strategies: IConversionStrategy[];

  constructor(strategies: IConversionStrategy[]) {
    this.strategies = strategies;
  }
  async convert(input: Buffer): Promise<Buffer> {
    let output = input;
    for (const strategy of this.strategies) {
      output = await strategy.convert(output);
    }
    return output;
  }
}
