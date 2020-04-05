import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as config from 'config'
import {Logger} from "@nestjs/common";


async function bootstrap() {

  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  //Port
  const port = process.env.PORT || serverConfig.port;

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();
  }

  const options = new DocumentBuilder()
      .setTitle('Task example')
      .setDescription('The Task Management API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  await app.listen(port); //是express的封装 所以方法名字都没有变
}
bootstrap();
