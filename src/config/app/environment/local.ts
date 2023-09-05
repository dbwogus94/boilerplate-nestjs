import { DefalutAppName } from '@app/common';
import { AppConfig } from '../app.config';

export const LocalConfig: AppConfig = {
  appName: process.env.APP_NAME ?? DefalutAppName,
  port: +(process.env.PORT ?? 3000),
  cors: { origin: process.env.CORS_ORIGIN ?? '*' },

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
};
