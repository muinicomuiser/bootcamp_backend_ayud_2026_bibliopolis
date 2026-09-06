import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GeneroLibro } from 'src/enum/genero_libro.enum';
import { CreateLibroDTO } from './dto/create_libro.dto';
import { GetLibroDTO } from './dto/get_libro.dto';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
    constructor(private readonly librosService: LibrosService){}
    

    // ​Obtener todas los libros y permitir filtrar por autor y/o género (Si no se envían
    // los filtros de autor o género debe devolver todos los libros)
    @ApiOperation({summary: "Obtener libros, filtrar por autor y género"})
    @ApiResponse({status: 200, description: "Retorna el conjunto de libros", type: [GetLibroDTO]})
    @ApiQuery({name: "autor", required: false})
    @ApiQuery({name: "genero", required: false, enum: GeneroLibro})
    @Get()
    obtenerFiltrados(@Query("autor") autorQuery?: string, @Query("genero") generoQuery?: GeneroLibro){
        return this.librosService.obtenerFiltrados(autorQuery, generoQuery)
    }
    
    
    // ​Obtener un libro según su ISBN
    @ApiOperation({summary: "Obtener libro por isbn"})
    @ApiResponse({status: 200, description: "Retorna el libro con el isbn", type: GetLibroDTO})
    @ApiResponse({status: 404, description: "Libro no encontrado"})
    @Get(':isbn')
    obtenerPorISBN(@Param("isbn") isbn: string): GetLibroDTO{
        return this.librosService.obtenerPorISBN(isbn)
    }
    
    
    // ​crear un nuevo libro, debe verificar que el ISBN no exista.
    @ApiOperation({ summary: "Crear un libro nuevo" })
    @ApiResponse({status: 201, description: "Crea un libro nuevo", type: GetLibroDTO})
    @ApiResponse({status: 400, description: "Error de validación | ISBN ya existe"})
    @ApiBody({type: CreateLibroDTO})
    @Post()
    crearLibro(@Body() dto: CreateLibroDTO){
        return this.librosService.crearLibro(dto)
    }
    
    
    // Eliminar un libro según su ISBN
    @ApiOperation({summary: "Eliminar por isbn"})
    @ApiResponse({status: 204, description: "Elimina un libro"})
    @ApiResponse({status: 404, description: "Libro no existe"})
    @HttpCode(204)
    @Delete(":isbn")
    eliminiarPorISBN(@Param("isbn") isbn: string){
        return this.librosService.eliminiarPorISBN(isbn)
    }
}