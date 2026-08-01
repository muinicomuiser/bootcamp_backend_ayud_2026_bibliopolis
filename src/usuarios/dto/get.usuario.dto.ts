import { ApiProperty } from "@nestjs/swagger";

export class GetUsuarioDTO {
    
    @ApiProperty({})
    id: number;
    
    @ApiProperty({})
    nombre: string;
    
    @ApiProperty({})
    correoElectronico: string;
    
    @ApiProperty({})
    direccion: string;

}