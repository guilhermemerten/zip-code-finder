/* eslint-disable import/prefer-default-export */
export const config = {
  redis: {
    nodes: [
      {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    ],
    options: {
      scaleReads: 'all'
    }
  },
  log: {
    level: 'debug'
  },
  jwt:{
    expireTime: 300
  }
};
