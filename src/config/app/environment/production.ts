import { DefalutAppName } from '@app/common';
import { AppConfig } from '../app.config';

export const ProdConfig: AppConfig = {
  appName: process.env.APP_NAME ?? DefalutAppName,
  port: +process.env.PORT,
  cors: { origin: process.env.CORS_ORIGIN },

  swagger: {
    apis: {
      info: {
        title: process.env.SWAGGER_APIS_TITLE ?? DefalutAppName,
        description: process.env.SWAGGER_APIS_DESCRIPTION ?? DefalutAppName,
        version: process.env.SWAGGER_APIS_VERSION,
      },
      securityConfig: {
        name: 'Access-Token',
        securityOptions: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Access JWT',
          description: 'Enter Access Token',
          in: 'header',
        },
      },
    },
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: +process.env.TRACES_SAMPLE_RATE,
  },
  slack: {
    serverErrorAlert: {
      channelName: process.env.SLACK_CHANNEL_NAME_BY_SERVER_ERROR_ALERT,
      webHooklUrl: process.env.SLACK_WEB_HOOK_URI_BY_SERVER_ERROR_ALERT,
      description: process.env.SLACK_DESCRIPTION_BY_SERVER_ERROR_ALERT,
      viewerUrl: process.env.SLACK_VIEWER_URL_BY_SERVER_ERROR_ALERT,
    },
  },
};
