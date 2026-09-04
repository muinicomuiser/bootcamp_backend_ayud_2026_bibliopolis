import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CreateLibroDTO } from './dto/create_libro.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LibrosService } from './libros.service';
import { GeneroLibro } from 'src/enum/genero_libro.enum';
import { GetLibroDTO } from './dto/get_libro.dto';

@Controller('libros')
export class LibrosController {
    constructor(private readonly librosService: LibrosService){}

    // a.​crear un nuevo libro, debe verificar que el ISBN no exista.
    @ApiOperation({
        summary: "Crea un libro nuevo", 
        description: "Este endpoint permite crear un libro nuevo"
    })
    @ApiTags("Creación")
    @ApiBody({type: CreateLibroDTO})
    @Post()
    crearLibro(@Body() dto: CreateLibroDTO){
        try {
            return this.librosService.crearLibro(dto)
        }
        catch(error){
            if(error instanceof Error) throw new BadRequestException("El isbn ya existe")
            throw new InternalServerErrorException()
        }
    }

    // c.​Obtener todas los libros y permitir filtrar por autor y/o género (Si no se envían
    // los filtros de autor o género debe devolver todos los libros)
    @ApiOperation({summary: "Retorna los libros, permite filtrar por autor y genero"})
    @ApiQuery({name: "autor", required: false})
    @ApiQuery({name: "genero", required: false, enum: GeneroLibro})
    @Get()
    obtenerFiltrados(@Query("autor") autorQuery?: string, @Query("genero") generoQuery?: GeneroLibro){
        return this.librosService.obtenerFiltrados(autorQuery, generoQuery)
    }

    // Obtener un libro según su ISBN GET/libros/:isbn
    // b.​Obtener un libro según su ISBN
    @Get(':isbn')
    obtenerPorISBN(@Param("isbn") isbn: string): GetLibroDTO{
        try {
            return this.librosService.obtenerPorISBN(isbn)
        }
        catch(error){
            if(error instanceof Error) throw new NotFoundException("No existe un libro con ese ISBN")
            throw new InternalServerErrorException()
        }        
    }


    // Eliminar un libro según su ISBN DELETE/libros/:isbn
    // Eliminar un libro según su ISBN

    @Delete(":isbn")
    eliminiarPorISBN(@Param("isbn") isbn: string){
        try {
            return this.librosService.eliminiarPorISBN(isbn)
        }
        catch(error){
            if(error instanceof Error) throw new BadRequestException("No existe un libro con ese ISBN")
            throw new InternalServerErrorException()                
        }    
    }

}