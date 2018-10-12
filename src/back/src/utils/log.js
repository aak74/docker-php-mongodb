const { transports, format, createLogger } = require('winston');
const { printf } = format;
const colors = require('colors/safe');
const util = require('util');

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

const formatDate = (date) => {
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

const uniFormat = (colorized) => {
  return printf(info => {
    const rest = JSON.stringify(Object.assign({}, info, {
      level: undefined,
      message: undefined,
      splat: undefined
    }));

    const processType = process.env.PROCESS_TYPE;

    let msg = '';

    if (colorized) {
      msg = `${colors[info.level || 'silly'](`${formatDate(Date.now())}${processType ? ` [ # ${processType.toUpperCase()}# ] ` : ' '}${info.level.toUpperCase()}:`)} ${info.message}`;
    } else {
      msg = `${formatDate(Date.now())}${processType ? ` [ # ${processType.toUpperCase()}# ] ` : ' '}${info.level.toUpperCase()}: ${info.message}`;
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

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: uniFormat(),
  transports: [
    new transports.File({
      filename: '/var/log/node/status.log',
    }),
    new transports.Console({
      format: uniFormat(true),
    }),
  ],
});

module.exports = {
  error: logger.error,
  info: logger.info,
  debug: logger.debug,
  warn: logger.warn,
  verbose: logger.verbose,
  silly: logger.silly,
};
