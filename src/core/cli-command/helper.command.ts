import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.info(`
        ${chalk.yellowBright('Программа для подготовки данных для REST API сервера.')}
        ${chalk.yellow('Пример:')}
            ${chalk.greenBright('main.js --<command> [--arguments]')}
        ${chalk.yellow('Команды:')}
            ${chalk.green('--version:')}                   ${chalk.magentaBright('# выводит номер версии')}
            ${chalk.green('--help:')}                      ${chalk.magentaBright('# печатает этот текст')}
            ${chalk.green('--import <path>:')}             ${chalk.magentaBright('# импортирует данные из TSV')}
            ${chalk.green('--generate <n> <path> <url>')}  ${chalk.magentaBright('# генерирует произвольное количество тестовых данных')}
        `);
  }
}
