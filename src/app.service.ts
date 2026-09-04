import { Injectable } from '@nestjs/common';
import { readFile, writeFile, readdir } from 'node:fs/promises';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Mundo';
  }
}
