import got from 'got';
import { MockDataType } from '../../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockDataType;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.warn(`Can't fetch data from ${url}.`);
      return;
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.info(`File ${filepath} was created!`);
  }
}
