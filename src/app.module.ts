import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfig, LocalConfig } from '@app/config';
import { DevelopmentGlobalProviders, GlobalModule } from '@app/custom';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [() => AppConfig.validate(LocalConfig)],
    }),
    GlobalModule,
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...DevelopmentGlobalProviders],
})
export class AppModule {}
