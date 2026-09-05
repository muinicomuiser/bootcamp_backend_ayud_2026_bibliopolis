import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const id = randomUUID()
    const res: Response = context.switchToHttp().getResponse()
    res.setHeader("x-request-id", id)
    const time = Date.now()
    return next.handle().pipe(
      map(data => {

        res.setHeader("latencia", Date.now() - time)
        return {
          data,
          succes: true,
          timestamp: Date.now()
        }
      }),
      tap(() => console.log(res.getHeaders()["x-request-id"])));
  }
}
