import {
  INestApplication,
  Logger,
  NestApplicationOptions,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { json } from 'express';
import helmet from 'helmet';

import { CorsConfig, SentryConfig } from '@app/config';
import { httpLogger } from '@app/custom';
import { defaultGlobalValidationPipeOptions } from '../constant';
import { swaggerbuilder } from '../swagger';

type AppCreateOption = {
  appModule: Type<any>;
} & Pick<NestApplicationOptions, 'logger'>;
type SwaggerBuilderType = typeof swaggerbuilder;
type SetMiddlewareOptions = { httpLogging?: boolean; globalPrefix?: string };
type SetSwaggerOptions = { docsPath: string };

export class NestBuilder {
  private constructor(
    private readonly _app: INestApplication,
    private readonly _configService: ConfigService,
  ) {}

  /**
   * AppModule 주입받아 Nest APP을 생성한다.
   * - 이 시점에 주입 받은 AppModule class가 생성되어 DI된다.
   * @param options
   * @param {Object} options.appModule - AppModule: Nest 최상위 모듈
   * @param {Object} options.logger
   * @returns
   */
  static async createApp(options: AppCreateOption): Promise<NestBuilder> {
    const { appModule, logger } = options;
    const app = await NestFactory.create<INestApplication>(appModule, {
      logger,
    });

    return new NestBuilder(app, app.get(ConfigService));
  }

  async runServer(): Promise<INestApplication> {
    await this._app //
      .useGlobalPipes(new ValidationPipe(defaultGlobalValidationPipeOptions))
      .listen(this._configService.get('port'));

    return this._app;
  }

  setSwagger(builder: SwaggerBuilderType, options: SetSwaggerOptions): this {
    builder(options.docsPath, this._app);
    return this;
  }

  /**
   * Express middleware 셋팅
   * @param options
   * @param options.globalPrifix - 사용하는 경우 반드시 Swagger 설정인 setDocs보다 먼저 셋팅되어야 한다.
   * @param options.httpLogging - http 요청에 대한 로깅 설정
   * @returns
   */
  setMiddleware(options: SetMiddlewareOptions = {}): this {
    if (!!options.httpLogging) {
      const logger = this._app.get(Logger);
      this._app.use(httpLogger(logger));
    }
    if (!!options.globalPrefix) {
      this._app.setGlobalPrefix(options.globalPrefix); // Note: Swagger 빌드전에 적용해야 docs에 적용된다.
    }

    const { origin, ...other } = this._configService.get<CorsConfig>('cors');
    this._app.enableCors({
      ...other,
      origin: typeof origin === 'string' ? origin.split(',') : origin,
    });
    this._app.use(json({ limit: '50mb' }));
    this._app.use(helmet());
    return this;
  }

  initSentry(): this {
    const sentryConfig = this._configService.get<SentryConfig>('sentry');

    Sentry.init({
      ...sentryConfig,
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
    });
    return this;
  }
}
