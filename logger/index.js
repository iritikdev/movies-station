const { createLogger, format, transports } = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logFormat = format.printf(({ level, message, timestamp, metadata }) => {
  return `TimeStamp: ${timestamp} \nMessage: ${message} \n[${level}] : ${metadata.stack}\n\n`;
});

const consoleFormat = format.printf(({ level, message, timestamp }) => {
  return `TimeStamp: ${timestamp} \nMessage: ${message} \n[${level}]`;
});

const date = new Date();
const dateFormat = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.simple(),
        format.colorize(),
        format.prettyPrint()
      ),
      handleExceptions: true,
    }),
    new transports.File({
      level: "error",
      format: format.combine(
        format.json(),
        format.metadata(),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        logFormat
      ),
      dirname: "logs/error",
      handleExceptions: true,
      filename: `error-${dateFormat}.log`,
    }),
    new transports.MongoDB({
      label: "error",
      level: "error",
      handleExceptions: true,
      format: format.combine(format.json(), format.metadata()),
      db: "mongodb://127.0.0.1:27017/vidly",
      collection: "logs",
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      cappedSize: 52428800,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
