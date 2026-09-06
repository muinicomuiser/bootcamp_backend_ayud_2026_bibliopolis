import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { catchError, first, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  
    const request = context.switchToHttp().getRequest()

    // Antes del controlador controlador
    const init_time = Date.now()

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Sucede todo lo demás de la aplicación                                                                          //
    // Pipes, controlador, servicios, bases de datos, integraciones, lectura de archivos, acciones varias de servicio //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Después del controlador
    return next.handle().pipe(
      tap(() => console.log(`Latencia: ${Date.now() - init_time} milisegundos`)),
      map(data => {

        // Acá se puede envoler el body en un objeto con datos adicionales.
        // Considerar que si se cambia la forma de la respuesta, se debería
        // ajustar la documentación de los endpoint que retornen datos 
        // para que representen la forma nueva de la respuesta.
        const respuesta = {
          data,
          requesId: request.headers["x-request-id"],
          // Cálculo de latencia restando al tiempo actual el valor de la variable 
          // creada en la línea 11, antes de pasar por el controlador. 
          latency: Date.now() - init_time 
        }
        return respuesta
      })

    );
  }
}
