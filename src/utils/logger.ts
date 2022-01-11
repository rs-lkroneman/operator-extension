const ERROR = "ERROR";
const WARN = "WARN";
const INFO = "INFO";

const CURRENT_LOG_LEVEL = INFO;
const LOG_LEVELS = [ERROR, WARN, INFO];

const isLogLevelEnabled = (logLevel) => {
  return LOG_LEVELS.indexOf(CURRENT_LOG_LEVEL) >= LOG_LEVELS.indexOf(logLevel);
};

const logger = {
  info(...args) {
    if (!isLogLevelEnabled(INFO)) {
      return;
    }

    console.log(...args);
  },
  warn(...args) {
    if (!isLogLevelEnabled(WARN)) {
      return;
    }

    console.warn(...args);
  },
  error(...args) {
    if (!isLogLevelEnabled(ERROR)) {
      return;
    }

    console.error(...args);
  },
};

export default logger;
