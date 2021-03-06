/* eslint-disable class-methods-use-this */
import * as winston from 'winston';

import {config} from '../../../config/config';

export default class Logger {
  private static instanceLogger: Logger;

  private constructor() {
    Logger.configureWinston();
  }

  private static configureWinston() {
    const consoleLog = new winston.transports.Console({
      format: winston.format.combine(winston.format.prettyPrint({ colorize: true })),
      level: config.log.level,
      silent: process.env.NODE_ENV === 'test'
    });
    winston.createLogger({
      exitOnError: false
    });

    winston.add(consoleLog);
  }

  static getInstance() {
    if (this.instanceLogger === undefined) {
      this.instanceLogger = new Logger();
    }
    return this.instanceLogger.getWinstonInstance();
  }

  private getWinstonInstance(){
    return winston;
  }
}
