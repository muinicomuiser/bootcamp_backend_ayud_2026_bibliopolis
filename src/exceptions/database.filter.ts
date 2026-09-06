import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DatabaseException, ElementConflictException, ElementNotFoundException } from './database_exceptions';
import { Response, Request } from 'express';

// Un filtro de excepciones que captura todas las excepciones que lanzan los servicios
// que se comunican con la base de datos.
// Acá se convierten esas excepciones de lógica interna a excepciones que entienda el cliente
// de la aplicación (incluyendo el código http más adecuado)


// Database es la clase base creada para excepciones de base de datos.
// Se capturarán todas las excepciones que hereden de esta clase
@Catch(DatabaseException)
export class DatabaseFilter<T> implements ExceptionFilter {
  
  catch(exception: T, host: ArgumentsHost) {

    // Lectura de Request y Response desde elemento 'host'
    const response = host.switchToHttp().getResponse<Response>()
    const request = host.switchToHttp().getRequest<Request>()

    // Lectura de request-id definido en etapas anteriores
    const requestId  = request.headers["request-id"]

    // Construcción de respuesta para cada excepción
    if(exception instanceof ElementNotFoundException){
      const status = HttpStatus.NOT_FOUND // Equivale a código 404
      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        requestId: requestId
      })      
    }


    if(exception instanceof ElementConflictException){
      const status = HttpStatus.BAD_REQUEST // Equivale a código 400
      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        requestId: requestId
      })      
    }
  }
}
