import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

// Un middleware para agregar el encabezado "x-request-id" en el Request (req)

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const request_id = randomUUID()
    req.headers["x-request-id"] = request_id
    next();
  }
}
