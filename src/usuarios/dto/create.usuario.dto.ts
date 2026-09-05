import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUsuarioDTO {
    
    @ApiProperty({example: "Nico"})
    @IsString()
    nombre: string
    
    @ApiProperty({})
    @IsString()
    correoElectronico: string
    
    @ApiProperty({})
    @IsString()
    contrasena: string
    
    @ApiProperty({})
    @IsString()
    direccion: string
}