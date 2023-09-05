import {
  InstanceValidator,
  StringValidatorOptional,
  StringValidator,
} from '@app/common';

export class SlackAlertOptions {
  @StringValidator()
  webHooklUrl: string;

  @StringValidatorOptional()
  channelName?: string | null;

  @StringValidatorOptional()
  description?: string | null;

  @StringValidatorOptional()
  viewerUrl?: string | null;
}

export class SlackConfig {
  @InstanceValidator(SlackAlertOptions)
  serverErrorAlert: SlackAlertOptions;
}
