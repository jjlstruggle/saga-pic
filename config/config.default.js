/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'dftest',
    },
    app: true,
    agent: false,
  }

  config.keys = appInfo.name + '_1653801870741_2625';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.proxy = true
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  config.multipart = {
    whitelist: [
      '.jpg', '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.wbmp',
      '.webp',
      '.tif',
      '.psd',
    ],
    mode: 'stream'
  }
  config.uploadDir = 'app/public/image';
  config.pathMap = 'app/public/data'
  config.static = {
    prefix: '/cdn/'
  }
  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
