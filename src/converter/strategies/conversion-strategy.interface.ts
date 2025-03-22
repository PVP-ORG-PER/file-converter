export interface IConversionStrategy {
  convert(input: Buffer): Promise<Buffer>;
}
