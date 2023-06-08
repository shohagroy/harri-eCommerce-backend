import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import path from "path";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const secend = date.getSeconds();
  return `${date.toDateString()} ${hour}: ${minute}: ${secend} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(label({ label: "harriShop!" }), timestamp(), myFormat),

  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "success",
        "dynamic-%DATE%-success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "harriShop!" }), timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "errors",
        "dynamic-%DATE%-error.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  errorLogger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}
