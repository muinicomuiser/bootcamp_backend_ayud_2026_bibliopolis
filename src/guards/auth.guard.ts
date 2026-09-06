import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


// Guard para bloquear consultas que no traigan un header de autorización específico.
// El header a revisar será "x-auth" y el valor de la clave será leída desde el archivo ".env".

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Acceso al objeto Request que trae los headers enviados por el cliente
    const request = context.switchToHttp().getRequest()

    // Lectura del header "x-auth"
    const auth_header: string | undefined = request.headers["x-auth"]

    // Si no viene el header, se cancela inmediatamente el proceso de la consulta
    if(!auth_header) return false

    // Lectura de la clave desde la variable de entorno y comparación con el header del cliente
    const auth_key = process.env.AUTH_KEY
    return auth_key == auth_header
  }
}
