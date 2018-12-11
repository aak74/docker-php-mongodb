const { transports, format, createLogger } = require('winston');
const { printf } = format;
const colors = require('colors/safe');
const util = require('util');

class Log {
  constructor({excludes}) {
    this.excludes = false;
    // this.excludes = excludes;

    colors.setTheme({
      silly: 'rainbow',
      input: 'grey',
      verbose: 'cyan',
      prompt: 'grey',
      info: 'green',
      data: 'grey',
      help: 'cyan',
      warn: 'yellow',
      debug: 'blue',
      error: 'red'
    });

    this.logger = createLogger({
      level: 'debug',
      format: this.uniFormat(),
      prettyPrint: true,
      transports: [
        new transports.File({
          filename: '/var/log/node/winston.log',
        }),
        new transports.Console({
          format: this.uniFormat(true),
        }),
      ],
    });
  }

  formatDate(date) {
    const d = new Date(date);
    const dateObject = {
      day: d.getDate().toString(),
      month: (d.getMonth() + 1).toString(),
      year: d.getFullYear().toString(),
      hours: d.getHours().toString(),
      minutes: d.getMinutes().toString(),
      seconds: d.getSeconds().toString(),
      milliseconds: d.getMilliseconds().toString(),
    };

    Object.entries(dateObject).forEach((item) => {
      switch (item[0]) {
        case 'year':
          break;
        case 'milliseconds':
          while(item[1].toString().length < 3) {
            item[1] = `0${item[1]}`;
          }
          break;
        default:
          while(item[1].toString().length < 2) {
            item[1] = `0${item[1]}`;
          }
          break;
      }
      dateObject[item[0]] = item[1];
    });

    return `${dateObject.year}-${dateObject.month}-${dateObject.day} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds}:${dateObject.milliseconds}`;
  };

  uniFormat(colorized) {
    return printf(info => {
      const rest = JSON.stringify(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined
      }));

      const processType = process.env.PROCESS_TYPE;

      let msg = '';

      if (colorized) {
        msg = `${colors[info.level || 'silly'](`${this.formatDate(Date.now())}${processType ? ` [ #${processType.toUpperCase()}# ] ` : ' '}${info.level.toUpperCase()}:`)} ${info.message}`;
      } else {
        msg = `${this.formatDate(Date.now())}${processType ? ` [ #${processType.toUpperCase()}# ] ` : ' '}${info.level.toUpperCase()}: ${info.message}`;
      }

      if (info.splat) {
        msg = util.format(msg, ...info.splat);
      }

      if (rest && rest !== '{}') {
        msg += ` ${rest}`;
      }

      return msg;
    });
  };

  error(e) {
    if (e.message) {
      console.log('err', e);
    } else {
      this.log('error', e);
    }
    // console.trace();
  }

  info(msg, context) {
    this.log('info', msg, context);
  }

  debug(msg, context) {
    this.log('debug', msg, context);
  }

  warn(msg, context) {
    this.log('warn', msg, context);
  }

  verbose(msg, context) {
    this.log('verbose', msg, context);
  }

  silly(msg, context) {
    this.log('silly', msg, context);
  }

  /**
   * Логгирование с учетом исключаемых элементов
   * @param {*} level 
   * @param {*} msg 
   * @param {*} context 
   */
  log(level, msg, context) {
    if (!msg.includes) {
      this.logger.log(level, msg, context);
      return;
    }
    if (this.excludes && this.excludes.some) {
      const includes = this.excludes.some(item => msg.includes(item));
      if (!includes) {
        this.logger.log(level, msg, context);
      }
      return;
    } 
    this.logger.log(level, msg, context);
  }
}

module.exports = Log;
// ([
//   // '#AUTHENTICATION#',
//   '#NOTIFIER#',
//   '#QUEUE#',
//   '#REDIS#',
// ]);
