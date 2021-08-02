import { configure } from 'log4js';

export const logger = configure({
  appenders: {
    development: { type: 'console' },
  },
  categories: {
    default: {
      appenders: ['development'],
      level: 'all',
    },
  },
});
