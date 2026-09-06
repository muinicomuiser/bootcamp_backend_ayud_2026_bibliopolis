import { Injectable } from '@nestjs/common';
import { Libro } from 'src/models/libro.model';
import { CreateLibroDTO } from './dto/create_libro.dto';
import { GeneroLibro } from 'src/enum/genero_libro.enum';
import { GetLibroDTO } from './dto/get_libro.dto';
import { ElementConflictException, ElementNotFoundException } from 'src/exceptions/database_exceptions';

@Injectable()
export class LibrosService {
    private libros: Libro[] = []

    constructor(){
        this.initDatabase()
    }

    // Obtener todos los libros. Filtrar por autor y género
    obtenerFiltrados(autor?: string, genero?: GeneroLibro){
        
        let librosFiltrados: Libro[] = this.libros
        if(autor){
            librosFiltrados = librosFiltrados.filter(libro => libro.autor == autor)
        }
        if(genero){
            librosFiltrados = librosFiltrados.filter(libro => libro.genero == genero)
        }
        return librosFiltrados.map(this.toDTO)
    }

    // Obtener libro por ISBN
    obtenerPorISBN(isbn: string): GetLibroDTO{
        
        const libroExistente = this.findByISBN(isbn)
        if(!libroExistente) {
            // Este error presonalizado construirá el mensaje:
            // "Libro con identicador '<isbn>' no encontrado"
            // Y será capturado en el filtro de excepciones
            throw new ElementNotFoundException("Libro", isbn)
        }

        return this.toDTO(libroExistente)
    }

    
    // Crear un libro nuevo
    crearLibro(dto: CreateLibroDTO){

        const libroExistente = this.findByISBN(dto.isbn)

        if(libroExistente) {
            // Este error presonalizado construirá el mensaje:
            // "Libro con isbn '<isbn>' ya existe"          
            // Y será capturado en el filtro de excepciones
            throw new ElementConflictException("Libro", "isbn", dto.isbn)
        }

        const entidad: Libro = this.toEntity(dto)
        this.libros.push(entidad)
        return this.toDTO(entidad)
    }


    // Eliminar libro por isbn
    eliminiarPorISBN(isbn: string){
        
        const index = this.libros.findIndex(libro => libro.isbn == isbn)
        if(index < 0) {
            throw new ElementNotFoundException("Libro", isbn)
        }

        this.libros.splice(index)
    }


    // Método interno, busca un libro en la lista de libros. Retorna Libro o undefined
    private findByISBN(isbn: string){
        
        return this.libros.find(libro => libro.isbn == isbn)
    }

    // Métodos útiles para mapear objetos

    private toEntity(dto: CreateLibroDTO): Libro{
        const entidad: Libro = new Libro()
        entidad.autor = dto.autor
        entidad.descripcion = dto.descripcion
        entidad.editorial = dto.editorial
        entidad.genero = dto.genero
        entidad.imagen = dto.imagen || ""
        entidad.isbn = dto.isbn
        entidad.precio = dto.precio
        entidad.stock = dto.stock
        entidad.titulo = dto.titulo
        return entidad
    }

    private toDTO(libro: Libro): GetLibroDTO{
        const dto: GetLibroDTO = new Libro()
        dto.autor = libro.autor
        dto.descripcion = libro.descripcion
        dto.editorial = libro.editorial
        dto.genero = libro.genero
        dto.imagen = libro.imagen || ""
        dto.isbn = libro.isbn
        dto.precio = libro.precio
        dto.stock = libro.stock
        dto.titulo = libro.titulo
        return dto
    }


    // Carga inicial de datos dummy (de ejemplo)
    private initDatabase(){
        const libros: Libro[] = [
            {
                isbn: "978-8497592208",
                titulo: "Cien años de soledad",
                autor: "Gabriel García Márquez",
                editorial: "Debolsillo",
                genero: GeneroLibro.NOVELA,
                precio: 12990,
                descripcion: "Una de las novelas más importantes de la literatura latinoamericana.",
                imagen: "https://example.com/cien-anos-de-soledad.jpg",
                stock: 15
            },
            {
                isbn: "978-8420674209",
                titulo: "1984",
                autor: "George Orwell",
                editorial: "Alianza Editorial",
                genero: GeneroLibro.NOVELA,
                precio: 10990,
                descripcion: "Novela distópica sobre una sociedad sometida a una vigilancia permanente.",
                imagen: "https://example.com/1984.jpg",
                stock: 20
            },
            {
                isbn: "978-8491050297",
                titulo: "Fahrenheit 451",
                autor: "Ray Bradbury",
                editorial: "Minotauro",
                genero: GeneroLibro.CIENCIA_FICCION,
                precio: 11990,
                descripcion: "Una sociedad futurista donde los libros están prohibidos.",
                imagen: "https://example.com/fahrenheit-451.jpg",
                stock: 12
            },
            {
                isbn: "978-8445071792",
                titulo: "El Hobbit",
                autor: "J. R. R. Tolkien",
                editorial: "Minotauro",
                genero: GeneroLibro.FANTASIA,
                precio: 13990,
                descripcion: "La aventura de Bilbo Bolsón a través de la Tierra Media.",
                imagen: "https://example.com/el-hobbit.jpg",
                stock: 18
            },
            {
                isbn: "978-8420633114",
                titulo: "Don Quijote de la Mancha",
                autor: "Miguel de Cervantes",
                editorial: "Alianza Editorial",
                genero: GeneroLibro.NOVELA,
                precio: 15990,
                descripcion: "Clásico de la literatura española protagonizado por Don Quijote y Sancho Panza.",
                imagen: "https://example.com/don-quijote.jpg",
                stock: 10
            },
            {
                isbn: "978-8420677330",
                titulo: "El principito",
                autor: "Antoine de Saint-Exupéry",
                editorial: "Salamandra",
                genero: GeneroLibro.FANTASIA,
                precio: 8990,
                descripcion: "Una historia aparentemente infantil con profundas reflexiones sobre la vida.",
                imagen: "https://example.com/el-principito.jpg",
                stock: 25
            },
            {
                isbn: "978-8437604947",
                titulo: "La República",
                autor: "Platón",
                editorial: "Cátedra",
                genero: GeneroLibro.FILOSOFIA,
                precio: 12990,
                descripcion: "Una de las obras fundamentales de la filosofía occidental.",
                imagen: "https://example.com/la-republica.jpg",
                stock: 8
            },
            {
                isbn: "978-8420669999",
                titulo: "Sapiens",
                autor: "Yuval Noah Harari",
                editorial: "Debate",
                genero: GeneroLibro.HISTORIA,
                precio: 18990,
                descripcion: "Recorrido por la historia de la humanidad desde sus orígenes hasta la actualidad.",
                imagen: "https://example.com/sapiens.jpg",
                stock: 14
            },
            {
                isbn: "978-8408270124",
                titulo: "Dune",
                autor: "Frank Herbert",
                editorial: "Debolsillo",
                genero: GeneroLibro.CIENCIA_FICCION,
                precio: 14990,
                descripcion: "Épica de ciencia ficción ambientada en el planeta desértico Arrakis.",
                imagen: "https://example.com/dune.jpg",
                stock: 16
            },
            {
                isbn: "978-8497593793",
                titulo: "El nombre de la rosa",
                autor: "Umberto Eco",
                editorial: "Debolsillo",
                genero: GeneroLibro.NOVELA,
                precio: 13990,
                descripcion: "Misterio histórico ambientado en una abadía medieval italiana.",
                imagen: "https://example.com/el-nombre-de-la-rosa.jpg",
                stock: 11
            }
        ];
        this.libros.push(...libros)
    }

}