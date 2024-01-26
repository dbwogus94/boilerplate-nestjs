import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerConfig, SwaggerOptions } from '@app/config';

export function swaggerbuilder(basePath: string, app: INestApplication): void {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const { apis } = swaggerConfig;
  buildAllServiceSwagger(`${basePath}`);
  function buildAllServiceSwagger(adminPath: string) {
    buildSwagger(adminPath, app, apis);
  }
}

function buildSwagger(
  path: string,
  app: INestApplication,
  options: SwaggerOptions,
  // eslint-disable-next-line @typescript-eslint/ban-types
  modules: Function[] = void 0,
): void {
  const { info, securityConfig } = options;
  const { title, description, version } = info;
  const { securityOptions, name } = securityConfig;

  const documentBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth(securityOptions, name)
    .setVersion(version);

  const swaggerConfig = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: modules,
  });
  SwaggerModule.setup(path, app, document);
}
