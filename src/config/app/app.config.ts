import { InstanceValidator, IntValidator, StringValidator } from '@app/common';
import { CorsConfig, SwaggerConfig } from '@app/config';
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
}
