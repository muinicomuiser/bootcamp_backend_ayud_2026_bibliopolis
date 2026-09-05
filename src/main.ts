import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ServiceExceptionsFilter } from './exceptions/service_exceptions.filter';
import { config } from 'dotenv'

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  logger: new ConsoleLogger({
    prefix: "Bibliopolis",
    logLevels: ["log"]
  }),
});
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.useGlobalFilters(new ServiceExceptionsFilter())

  const config = new DocumentBuilder()
  .setTitle('API Usuarios')
  .setDescription('Esta api describe a los usuarios de ...')
  .setVersion('1.0')
  .addTag('usuarios')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
