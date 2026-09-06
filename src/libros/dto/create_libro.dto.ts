import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { GeneroLibro } from "src/enum/genero_libro.enum";

// Si se definió que el pipe de validación tendrá activa la opción de "whitelist",
// todas las propiedades de los to de entrada tienen que tener algún validador
// para que no sean eliminadas del objeto al ser validadas.
// (Whitelist solo deja pasar propiedades validadas, las demás las recorta)
export class CreateLibroDTO {

    // La documentación de las propiedades debe coincidir con sus validaciones
    @ApiProperty({example: "libro-123456", minLength: 10, maxLength: 50})
    @Length(10, 50) // Equivale a los decoradores @MinLength y @MacxLength
    @IsNotEmpty()
    @IsString()
    isbn: string;
    
    @ApiProperty({example: "Título"})
    @IsNotEmpty()
    @IsString()
    titulo: string;
    
    @ApiProperty({example: "Yo"})
    @IsNotEmpty()
    @IsString()
    autor: string;
    
    @ApiProperty({example: "Libros Editorial"})
    @IsNotEmpty()
    @IsString()
    editorial: string;
    
    @ApiProperty({enum: GeneroLibro, example: GeneroLibro.NOVELA})
    @IsNotEmpty()
    @IsEnum(GeneroLibro)
    genero: GeneroLibro;
    
    @ApiProperty({example: 1000, minimum: 0})
    @Min(0)
    @IsInt()
    precio: number;
    
    @ApiProperty({example: "img.png", required: false})
    @IsOptional() // Es opcional, puede no venir
    @IsString()
    imagen?: string;
    
    @ApiProperty({example: "Libro de arte"})
    @IsNotEmpty()
    @IsString()
    descripcion: string;
    
    @ApiProperty({example: 10, minimum: 0})
    @Min(0)
    @IsInt()
    stock: number;
}