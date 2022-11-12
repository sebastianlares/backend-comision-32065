const pinoLogger = require('pino');

const levels = { info: 30, warn: 40, error: 50 };

const streams = Object.keys(levels).map(level => {
  return {
    level: level,
    stream: pinoLogger.destination(`${process.cwd()}/${level}.log`),
  };
});

module.exports = pinoLogger(
  {
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: label => {
        return { level: label };
      },
    },
  },

  pinoLogger.multistream(streams, {
    levels,
    dedupe: true,
  }),
);
