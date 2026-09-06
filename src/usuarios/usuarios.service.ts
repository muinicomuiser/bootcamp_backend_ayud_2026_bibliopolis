import { Injectable } from '@nestjs/common';
import { GeneroUsuario } from 'src/enum/genero_usuario.enum';
import { ElementConflictException, ElementNotFoundException } from 'src/exceptions/database_exceptions';
import { Usuario } from 'src/models/usuario.model';
import { CreateUsuarioDTO } from './dto/create.usuario.dto';
import { GetUsuarioDTO } from './dto/get.usuario.dto';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];

    constructor(){
        this.initDatabase()
    }

    
    obtenerTodos(): GetUsuarioDTO[] {
        
        const usuariosDTO: GetUsuarioDTO[] = this.usuarios.map(usuario => this._toGetDTO(usuario))
        return usuariosDTO
    }
    
    
    obtenerPorID(id: number): GetUsuarioDTO {

        const usuarioExiste = this.usuarios.find(usuario => usuario.id == id)
        
        if(!usuarioExiste) {
            // Este error presonalizado construirá el mensaje:
            // "Usuario con identicador '<id>' no encontrado"
            // Y será capturado en el filtro de excepciones         
            throw new ElementNotFoundException("Usuario", id)
        }
        
        const dto = this._toGetDTO(usuarioExiste)
        return dto        
    }


    registrarUsuario(dto: CreateUsuarioDTO): GetUsuarioDTO {
        
        const usuarioExiste = this.usuarios.find((elemento) => elemento.correoElectronico == dto.correoElectronico)

        if(usuarioExiste) {
            // Este error presonalizado construirá el mensaje:
            // "Usuario con correoElectronico '<correoElectronico>' ya existe"          
            // Y será capturado en el filtro de excepciones            
            throw new ElementConflictException("Usuario", "correoElectronico", dto.correoElectronico)
        }
            
        
        const usuario: Usuario = this._toEntity(dto)
        this.usuarios.push(usuario)

        const getDto = this._toGetDTO(usuario)
        return getDto
    }


    eliminarPorID(id: number){

        const usuarioIDX = this.usuarios.findIndex(usuario => usuario.id == id)
        
        if(usuarioIDX < 0) {
            throw new ElementNotFoundException("Usuario", id)
        }
        
        this.usuarios.splice(usuarioIDX)
    }


    // Métodos útiles de mapeo
    private _toEntity(dto: CreateUsuarioDTO): Usuario{
        const usuario: Usuario = new Usuario()
        usuario.nombre = dto.nombre
        usuario.direccion = dto.direccion
        usuario.contrasena = dto.contrasena
        usuario.correoElectronico = dto.correoElectronico
        usuario.id = this.usuarios[this.usuarios.length - 1].id + 1
        return usuario        
    }

    private _toGetDTO(usuario: Usuario): GetUsuarioDTO {
        const getDto = new GetUsuarioDTO()
        getDto.id = usuario.id
        getDto.nombre = usuario.nombre
        getDto.direccion = usuario.direccion
        getDto.correoElectronico = usuario.correoElectronico
        return getDto
    }
    private initDatabase(){
        const usuarios: Usuario[] = [
            {
                id: 1,
                nombre: "Juan Pérez",
                correoElectronico: "juan.perez@email.com",
                contrasena: "Juan1234!",
                direccion: "Av. Providencia 1234, Santiago",
                genero: GeneroUsuario.MASCULINO
            },
            {
                id: 2,
                nombre: "María González",
                correoElectronico: "maria.gonzalez@email.com",
                contrasena: "Maria5678!",
                direccion: "Av. Las Condes 2456, Santiago",
                genero: GeneroUsuario.FEMENINO
            },
            {
                id: 3,
                nombre: "Carlos Rodríguez",
                correoElectronico: "carlos.rodriguez@email.com",
                contrasena: "Carlos9012!",
                direccion: "Calle Huérfanos 876, Santiago",
                genero: GeneroUsuario.MASCULINO
            },
            {
                id: 4,
                nombre: "Ana Martínez",
                correoElectronico: "ana.martinez@email.com",
                contrasena: "Ana3456!",
                direccion: "Av. Irarrázaval 1876, Ñuñoa",
                genero: GeneroUsuario.FEMENINO
            },
            {
                id: 5,
                nombre: "Pedro Soto",
                correoElectronico: "pedro.soto@email.com",
                contrasena: "Pedro7890!",
                direccion: "Av. Vicuña Mackenna 456, Santiago",
                genero: GeneroUsuario.MASCULINO
            },
            {
                id: 6,
                nombre: "Laura Fernández",
                correoElectronico: "laura.fernandez@email.com",
                contrasena: "Laura2345!",
                direccion: "Av. España 123, Santiago",
                genero: GeneroUsuario.FEMENINO
            },
            {
                id: 7,
                nombre: "Diego Morales",
                correoElectronico: "diego.morales@email.com",
                contrasena: "Diego6789!",
                direccion: "Av. Macul 2345, Macul",
                genero: GeneroUsuario.MASCULINO
            },
            {
                id: 8,
                nombre: "Sofía Ramírez",
                correoElectronico: "sofia.ramirez@email.com",
                contrasena: "Sofia4567!",
                direccion: "Av. Apoquindo 3456, Las Condes",
                genero: GeneroUsuario.FEMENINO
            },
            {
                id: 9,
                nombre: "Andrés Castillo",
                correoElectronico: "andres.castillo@email.com",
                contrasena: "Andres8901!",
                direccion: "Av. La Florida 5678, La Florida",
                genero: GeneroUsuario.MASCULINO
            },
            {
                id: 10,
                nombre: "Camila Torres",
                correoElectronico: "camila.torres@email.com",
                contrasena: "Camila1234!",
                direccion: "Av. Santa Isabel 789, Santiago",
                genero: GeneroUsuario.FEMENINO
            }
        ];
        this.usuarios.push(...usuarios)
    }

}
