import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){

    }

    // Registrar un nuevo usuario POST/usuarios
    @Post()
    registrarUsuario(@Body() dto: CreateUsuarioDTO){
        return this.usuariosService.registrarUsuario(dto)
    }
 
    // Obtener un usuario según su id GET/usuarios/:id
    @Get(':id')
    obtenerPorID(@Param('id') id: number){
        return this.usuariosService.obtenerPorID(+id)
        
    }
    
    // Obtener todos los usuarios GET/usuarios
    @Get()
    obtenerTodos(): GetUsuarioDTO[] {
        return this.usuariosService.obtenerTodos()
    }

    // Eliminar un usuario según su id DELETE/usuarios/:nombreUsuario
    @HttpCode(204)
    @Delete(':id')
    eliminarPorID(@Param('id') id: number){
        return this.usuariosService.eliminarPorID(+id)
    }
}
