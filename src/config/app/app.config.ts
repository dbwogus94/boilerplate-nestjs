import {
  InstanceValidator,
  InstanceValidatorOptional,
  IntValidator,
  StringValidator,
} from '@app/common';
import {
  CorsConfig,
  SentryConfig,
  SlackConfig,
  SwaggerConfig,
} from '@app/config';
import { BaseConfig } from './base.config';

export class AppConfig extends BaseConfig {
  @StringValidator()
  readonly appName: string;

  @IntValidator()
  readonly port: number;

  @InstanceValidator(CorsConfig)
  readonly cors: CorsConfig;

  @InstanceValidator(SwaggerConfig)
  readonly swagger: SwaggerConfig;

  @InstanceValidatorOptional(SentryConfig)
  readonly sentry?: SentryConfig;

  @InstanceValidatorOptional(SlackConfig)
  readonly slack?: SlackConfig;
}
