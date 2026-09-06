import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuariosService: UsuariosService){

    }

    // Registrar un nuevo usuario 
    @ApiOperation({summary: "Crear usuario"})
    @ApiResponse({status: 201, description: "Usuario creado", type: GetUsuarioDTO})
    @ApiResponse({status: 400, description: "Correo ya existe | Datos de body inválidos"})
    @ApiBody({type: CreateUsuarioDTO})
    @Post()
    registrarUsuario(@Body() dto: CreateUsuarioDTO){
        return this.usuariosService.registrarUsuario(dto)
    }


    
    // Obtener un usuario según su id
    @ApiOperation({summary: "Obtener usuario por id"})
    @ApiResponse({status: 200, description: "Usuario encontrado", type: GetUsuarioDTO})
    @ApiResponse({status: 400, description: "Param no válido"})
    @ApiResponse({status: 404, description: "No se encontró un usuario con ese id"})
    @ApiParam({name: "id", type: "number"})
    @Get(':id')
    obtenerPorID(@Param('id', ParseIntPipe) id: number){
        return this.usuariosService.obtenerPorID(id)
    }
    
    
    // Obtener todos los usuarios
    @ApiOperation({summary: "Obtener todos los usuarios"})
    @ApiResponse({status: 200, description: "Arreglo con todos los usuarios", type: [GetUsuarioDTO]})
    @ApiHeader({name: "x-auth"})
    @UseGuards(AuthGuard)
    @Get()
    obtenerTodos(): GetUsuarioDTO[] {
        return this.usuariosService.obtenerTodos()
    }
    
    

    
    // Eliminar un usuario según su id
    @ApiResponse({status: 204, description: "Usuario eliminado"})
    @ApiResponse({status: 400, description: "Param no válido"})
    @ApiResponse({status: 404, description: "No se encontró un usuario con ese id"})
    @ApiOperation({summary: "Eliminar usuario por id"})
    @ApiParam({name: "id"})
    @HttpCode(204)
    @Delete(':id')
    eliminarPorID(@Param('id', ParseIntPipe) id: number){
        return this.usuariosService.eliminarPorID(+id)
    }
}
