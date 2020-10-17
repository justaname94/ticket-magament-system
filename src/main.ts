import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from './app.module';
import Config from './config';

async function bootstrap() {
  let app;
  const {port, env} = Config.server;;

  if (env === 'production') {
    const httpsOptions = {
      key: fs.readFileSync('./secrets/private-key.pem'),
      cert: fs.readFileSync('./secrets/public-certificate.pem'),
    };

    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });

  } else {
    app = await NestFactory.create(AppModule);
    app.enableCors();
  }

  await app.listen(port);
}

bootstrap();
