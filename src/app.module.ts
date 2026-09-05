import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RequestIdMiddleware } from './middleware/request-id.middleware';

@Module({
  imports: [],
  controllers: [AppController, UsuariosController, LibrosController],
  providers: [AppService, UsuariosService, LibrosService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware, RequestIdMiddleware)  
    .exclude({
      path: 'usuarios',
      method: RequestMethod.GET
    })
    .forRoutes(UsuariosController, LibrosController)
  }  
}
