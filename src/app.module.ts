import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfig, LocalConfig } from '@app/config';
import {
  DevelopmentGlobalProviders,
  GlobalModule,
  ProductionProviders,
} from '@app/custom';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvUtil } from './common';
import { ProdConfig } from './config/app/environment/production';
import { DomainModule } from './domain';

const globalProviders = EnvUtil.isProd()
  ? [...ProductionProviders]
  : [...DevelopmentGlobalProviders];
const config = EnvUtil.isProd() ? ProdConfig : LocalConfig;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => AppConfig.validate(config)],
    }),
    GlobalModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...globalProviders],
})
export class AppModule {}
