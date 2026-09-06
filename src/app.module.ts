import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { LibrosController } from './libros/libros.controller';
import { LibrosService } from './libros/libros.service';
import { RequestIdMiddleware } from './middleware/request-id.middleware';

@Module({
  imports: [],
  controllers: [AppController, UsuariosController, LibrosController],
  providers: [AppService, UsuariosService, LibrosService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RequestIdMiddleware)  
    .forRoutes(UsuariosController, LibrosController)
  }    
}
