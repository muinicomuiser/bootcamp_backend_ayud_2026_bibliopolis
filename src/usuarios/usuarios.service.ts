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

        // La idea es convertir cada Usuario de la base de datos en un DTO tipo GetUsuarioDTO.
        // Para eso hay que iterar por cada usuario de la lista y convertirlo.
        // Tres formas de recorrer el array y aplicar esa transformación
        // (Para ambas se usará el método definido más abajo "_toGetDTO", que convierte un objeto tipo
        // Usuario en un objeto DTO tipo GetUsuarioDTO)

        // 1. Con un ciclo for
        const usuariosDTO_1: GetUsuarioDTO[] = []
        for(let usuario of this.usuarios){
            // Reutilizando la función que convierte un Usuario en un DTO
            const usuarioDTO = this._toGetDTO(usuario)
            usuariosDTO_1.push(usuarioDTO)
        }

        // 2. Con el método "forEach()" de array, que ejecuta una acción por cada elemento del arreglo
        // Se ejecuta la función de transformación a DTO e inserción en el arreglo dentro del argumento
        // del método .forEach(función)
        const usuariosDTO_2: GetUsuarioDTO[] = []
        this.usuarios.forEach(usuario => {
            const usuarioDTO = this._toGetDTO(usuario)
            usuariosDTO_2.push(usuarioDTO)            
        }) 

        // 3. Con el método "map()" de array, que aplica una transformación a cada elemento del arreglo
        // y retorna un arreglo nuevo con los objetos transformados.
        // Recibe como parámetro la función de transformación.
        const usuariosDTO_3: GetUsuarioDTO[] = this.usuarios.map(usuario => this._toGetDTO(usuario))
        return usuariosDTO_3
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
