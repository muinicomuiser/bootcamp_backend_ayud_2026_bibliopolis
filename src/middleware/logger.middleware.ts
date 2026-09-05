import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger()
  use(req: any, res: any, next: () => void) {
    this.logger.log("Method", req.method)
    this.logger.log("Path", req.path)
    next();
  }
}
