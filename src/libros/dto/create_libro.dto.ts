import { ApiProperty } from "@nestjs/swagger";
import { GeneroLibro } from "src/enum/genero_libro.enum";

export class CreateLibroDTO {
    @ApiProperty({example: "libro-123"})
    isbn: string;

    @ApiProperty({example: "Título"})
    titulo: string;

    @ApiProperty({example: "Yo"})
    autor: string;

    @ApiProperty({example: "Libros Editorial"})
    editorial: string;

    @ApiProperty({enum: GeneroLibro, example: GeneroLibro.NOVELA})
    genero: GeneroLibro;

    @ApiProperty({example: 1000, maximum: 50000, minimum: 0})
    precio: number;

    @ApiProperty({example: "img.png", required: false})
    imagen?: string;

    @ApiProperty({example: "Libro de arte"})
    descripcion: string;

    @ApiProperty({example: 10})
    stock: number;
}