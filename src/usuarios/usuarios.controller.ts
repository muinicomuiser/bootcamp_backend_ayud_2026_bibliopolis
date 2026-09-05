import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/guard/authorization.guard';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';
import { UsuariosService } from './usuarios.service';
@Controller('usuarios')
export class UsuariosController {
    
    constructor(private readonly usuariosService: UsuariosService){
        
    }
    
    // Registrar un nuevo usuario POST/usuarios
    @ApiBody({type: CreateUsuarioDTO})
    @Post()
    registrarUsuario(@Body() dto: CreateUsuarioDTO){
        return this.usuariosService.registrarUsuario(dto)
    }
    
    // Obtener un usuario según su id GET/usuarios/:id
    @ApiParam({name: "id", required: true})
    @ApiOperation({summary: "Obtiene un usuario por su id"})
    @Get(':id')
    obtenerPorID(@Param('id', ParseIntPipe) id){
        return this.usuariosService.obtenerPorID(id)
        
    }
    
    // Obtener todos los usuarios GET/usuarios
    @ApiHeader({name: "x-api-header" })
    @UseGuards(AuthorizationGuard)
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
