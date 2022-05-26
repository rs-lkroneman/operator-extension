const DEBUG = "DEBUG";
const ERROR = "ERROR";
const WARN = "WARN";
const INFO = "INFO";

const CURRENT_LOG_LEVEL = ERROR;
const LOG_LEVELS = [ERROR, WARN, INFO];

const isLogLevelEnabled = (logLevel) => {
  return LOG_LEVELS.indexOf(CURRENT_LOG_LEVEL) >= LOG_LEVELS.indexOf(logLevel);
};

const logger = {
  debug(...args) {
    if (!isLogLevelEnabled(DEBUG)) {
      return;
    }

    console.log(...args);
  },
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
