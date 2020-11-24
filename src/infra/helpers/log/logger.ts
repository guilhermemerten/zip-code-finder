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
      level: config.log.level
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
    return this.instanceLogger;
  }

  info(message:string, metadata?:any[]){
    return winston.info(message, metadata);
  }

  debug(message:string, metadata?:any[]){
    return winston.debug(message, metadata);
  }

  error(message:string, metadata?:any[]){
    return winston.error(message, metadata);
  }
}
