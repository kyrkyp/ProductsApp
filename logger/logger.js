// const logger = require('winston');
const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");
require("dotenv").config();

const { combine, timestamp, label, prettyPrint } = format;

const CATEGORY = "Winston custom format";

const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    // format.json()
    prettyPrint({
      colorize: true,
    })
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: "logs/example.log",
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true,
      },
      collection: "server_logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console(),
  ],
});
