import { NumberValidator, StringValidator } from '@app/common';
import { NodeOptions } from '@sentry/node';

export class SentryConfig implements NodeOptions {
  @StringValidator()
  dsn: string;

  @NumberValidator()
  tracesSampleRate: number;
}
