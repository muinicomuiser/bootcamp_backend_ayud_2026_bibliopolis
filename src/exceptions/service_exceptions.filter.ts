import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { ElementAlreadyExistsError, ElementNotFoundError, ServiceError } from './service_exceptions';

const ErrorStatusMap: Record<string, HttpStatus> = {
  [ElementAlreadyExistsError.name]: HttpStatus.BAD_REQUEST,
  [ElementNotFoundError.name]: HttpStatus.NOT_FOUND
}


@Catch(ServiceError)
export class ServiceExceptionsFilter<T> implements ExceptionFilter {
  private logger = new Logger(ServiceExceptionsFilter.name)
  catch(exception: ServiceError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const req = host.switchToHttp().getRequest<Request>();

    const mappedStatus = ErrorStatusMap[exception.name]

    const req_id = req["request_id"] || "N/A"

    if (mappedStatus){
      this.logger.warn(`{${req.url}, ${req.method}}`, `Request {${req_id}} ${exception.message}`)
      return res.status(mappedStatus).json({
        statusCode: mappedStatus,
        message: exception.message
      })
    }
    
    this.logger.error(`{${req.url}, ${req.method}}`, `Request {${req["request_id"]}} ${exception.message}`, exception.stack)
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Error interno del servidor"
    })
  }
}
