import { ApiProperty } from "@nestjs/swagger"

export class CreateUsuarioDTO {
    
    @ApiProperty({example: "Nico"})
    nombre: string

    @ApiProperty({})
    correoElectronico: string
    
    @ApiProperty({})
    contrasena: string
    
    @ApiProperty({})
    direccion: string
}