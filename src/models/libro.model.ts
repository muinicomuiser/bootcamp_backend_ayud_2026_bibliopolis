import { GeneroLibro } from "src/enum/genero_libro.enum";

export class Libro {
    isbn: string;
    titulo: string;
    autor: string;
    editorial: string;
    genero: GeneroLibro;
    precio: number;
    descripcion: string;
    imagen: string;
    stock: number;
}

// isbn: ISBN del libro, obligatorio, único)
// titulo: título del libro, obligatorio)
// autor: autor del libro, obligatorio)
// editorial: editorial del libro)
// genero: género literario del libro)
// precio: precio del libro
// descripción: descripción del libro
// imagen: ruta a la imagen de portada del libro
// stock: cantidad de libros disponibles en stock