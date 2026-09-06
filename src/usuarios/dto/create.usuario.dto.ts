import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


// Si se definió que el pipe de validación tendrá activa la opción de "whitelist",
// todas las propiedades de los to de entrada tienen que tener algún validador
// para que no sean eliminadas del objeto al ser validadas.
// (Whitelist solo deja pasar propiedades validadas, las demás las recorta)
export class CreateUsuarioDTO {
    
    // La documentación de las propiedades debe coincidir con sus validaciones
    @ApiProperty({ example: "Nico", maxLength: 70 })
    @MaxLength(70)
    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @ApiProperty({ example: "nico@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    correoElectronico: string;
    
    @ApiProperty({ example: "clave123", minLength: 8, maxLength: 70 })
    @MinLength(8)
    @MaxLength(70)
    @IsString()
    contrasena: string;
    
    @ApiProperty({example: "Calle 123, ciudad"})
    @IsNotEmpty()
    @IsString()
    direccion: string;

}