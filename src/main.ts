import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseFilter } from './exceptions/database.filter';
import { GlobalInterceptor } from './interceptors/global.interceptor';


config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.useGlobalFilters(new DatabaseFilter())
  app.useGlobalInterceptors(new GlobalInterceptor())

  const config = new DocumentBuilder()
  .setTitle('API Bibliópolis')
  .setDescription('Esta api describe la api de bibliópolis')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
