import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { initializeTransactionalContext } from 'typeorm-transactional';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.enableVersioning();

  app.useLogger(app.get(Logger));

  // TODO do we need this? https://github.com/iamolegga/nestjs-pino#expose-stack-trace-and-error-class-in-err-property
  // app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const configService = app.select(SharedModule).get(ApiConfigService);
  if (configService.documentationEnabled) {
    setupSwagger(app);
  }
  await app.listen(3000);
}
bootstrap();
