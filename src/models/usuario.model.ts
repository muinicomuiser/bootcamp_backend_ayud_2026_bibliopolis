import { GeneroUsuario } from "src/enum/genero_usuario.enum";

export class Usuario {
    id: number;
    nombre: string;
    correoElectronico: string;
    contrasena: string;
    direccion: string;
    genero: GeneroUsuario;
    // edad: number
    // last_update: Date
    // created: Date
    // cosas_privadas: string
}

