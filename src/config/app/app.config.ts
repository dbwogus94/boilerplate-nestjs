import { InstanceValidator, IntValidator, StringValidator } from '@app/common';
import { BaseConfig } from './base.config';
import { CorsConfig } from '../cors';
import { DatabaseConfig } from '../database';
import { SwaggerConfig } from '../swagger';
import { SentryConfig, SlackConfig } from '../monitor';

export class AppConfig extends BaseConfig {
  @StringValidator()
  readonly appName: string;

  @IntValidator()
  readonly port: number;

  @InstanceValidator(CorsConfig)
  readonly cors: CorsConfig;

  @InstanceValidator(DatabaseConfig)
  readonly database: DatabaseConfig;

  @InstanceValidator(SwaggerConfig)
  readonly swagger: SwaggerConfig;

  @InstanceValidator(SentryConfig)
  readonly sentry: SentryConfig;

  @InstanceValidator(SlackConfig)
  readonly slack: SlackConfig;
}
