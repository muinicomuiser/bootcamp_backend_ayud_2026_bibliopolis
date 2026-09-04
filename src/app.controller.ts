import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Este método devuelve un texto
  @Get()
  getHello(): string{
    return this.appService.getHello();
  }
}
