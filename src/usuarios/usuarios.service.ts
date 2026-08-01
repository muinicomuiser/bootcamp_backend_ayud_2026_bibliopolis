import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from 'src/models/usuario.model';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];

    constructor(){
        
    }

    registrarUsuario(dto: CreateUsuarioDTO): GetUsuarioDTO {
        
        const usuarioExiste = this.usuarios.find((elemento) => elemento.correoElectronico == dto.correoElectronico)


        if(usuarioExiste) throw new BadRequestException("El correo ya está registrado")
        
        const usuario: Usuario = new Usuario()
        usuario.nombre = dto.nombre
        usuario.direccion = dto.direccion
        usuario.contrasena = dto.contrasena
        usuario.correoElectronico = dto.correoElectronico
        usuario.id = this.usuarios.length + 1

        this.usuarios.push(usuario)

        const getDto = this._toGetDTO(usuario)
        return getDto
    }

    obtenerPorID(id: number): GetUsuarioDTO {
        const usuarioExiste = this.usuarios.find(usuario => usuario.id == id)
        if(!usuarioExiste) throw new NotFoundException("No existe el usuario con ese ID")
        
        const dto = this._toGetDTO(usuarioExiste)
        return dto        
    }

    obtenerTodos(): GetUsuarioDTO[] {

        // const usuariosDto: GetUsuarioDTO[] = this.usuarios.map(usuario => {
        //     const getDto = new GetUsuarioDTO()
        //     getDto.id = usuario.id
        //     getDto.nombre = usuario.nombre
        //     getDto.direccion = usuario.direccion
        //     getDto.correoElectronico = usuario.correoElectronico
        //     return getDto
        // })
        const usuariosDto: GetUsuarioDTO[] = this.usuarios.map(usuario => this._toGetDTO(usuario))
        return usuariosDto
    }

    eliminarPorID(id: number){
        const usuarioIDX = this.usuarios.findIndex(usuario => usuario.id == id)
        if(usuarioIDX < 0) throw new NotFoundException("No existe el usuario con ese ID")
        this.usuarios.splice(usuarioIDX)
        console.log("eliminado", usuarioIDX)
    }

    private _toGetDTO(usuario: Usuario): GetUsuarioDTO {
        const getDto = new GetUsuarioDTO()
        getDto.id = usuario.id
        getDto.nombre = usuario.nombre
        getDto.direccion = usuario.direccion
        getDto.correoElectronico = usuario.correoElectronico
        return getDto
    }



}
