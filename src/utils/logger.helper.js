import pino from 'pino';
import pinoHttp from 'pino-http';

const transport = pino.transport({
  targets: [{
    //所有日志配置
    level: 'trace',
    target: 'pino/file',
    options: {
      mkdir: true, destination: './logs/all-logs.log',
    }
  }, {
    //错误日志配置
    level: 'error',
    target: 'pino/file',
    options: {
      mkdir: true, destination: './logs/error.log',
    }
  }, {
    //终端日志配置
    level: 'info',
    target: 'pino-pretty',
    options: {
      colorize: true,
    }
  }]
})

export const logger = pino(transport);
export const pinoHttpMiddleware = pinoHttp({
  logger, // serializers: { //request body日志显示，可能存在安全问题
  //   req(req) {
  //     req.body = req.raw.body;
  //     return req;
  //   }
  // },
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  }
});