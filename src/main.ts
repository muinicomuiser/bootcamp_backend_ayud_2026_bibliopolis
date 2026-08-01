import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
