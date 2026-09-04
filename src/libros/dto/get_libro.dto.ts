import { ApiProperty } from "@nestjs/swagger";
import { GeneroLibro } from "src/enum/genero_libro.enum";

export class GetLibroDTO {
    @ApiProperty()
    isbn: string;
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    autor: string;
    @ApiProperty()
    editorial: string;
    @ApiProperty()
    genero: GeneroLibro;
    @ApiProperty()
    precio: number;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    imagen: string;
    @ApiProperty()
    stock: number;
}