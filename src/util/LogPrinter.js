export class LogPrinter {
  static error(item) {
    console.error(`[ERROR] ${item}`);
  }

  static log(item) {
    console.log(item);
  }

  static debug(item) {
    console.debug(`[DEBUG] ${item}`);
  }

  static info(item) {
    console.info(`[INFO] ${item}`);
  }
}
