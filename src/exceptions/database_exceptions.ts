// Creación de clase Excepción personalizada para manejar todas las excepciones de la
// capa de acceso a la base de datos.
// Los errores específicos heredarán de esta clase
export class DatabaseException extends Error {
    constructor(message?: string){
        super(message)
    }
}

// Excepción para cualquier búsqueda en la base de datos que no sea exitosa
export class ElementNotFoundException extends DatabaseException{
    
    // El constructor recibe el recurso buscado (por ejemplo Usuario, Libro, etcétera)
    // y el identificador buscado. Construye un mensaje con estos dos valores.
    constructor(resource: string, id: string | number){

        // Ejemplo: "Usuario con identificador '123' no encontrado"
        super(`${resource} con identificador '${id}' no encontrado`,)
        this.name = ElementNotFoundException.name
    }    
}

// Excepción para cada caso en que no se pueda procesar una consulta porque presenta un conflicto
// con los datos existente (por ejemplo identificadores duplicados)
export class ElementConflictException extends DatabaseException{

    // El constructor recibe el recurso buscado (por ejemplo Usuario, Libro, etcétera),
    // el campo de conflicto (por ejemplo "correo") y el valor del conflicto (el correo específico). 
    // Construye un mensaje con estos tres valores.
    constructor(resource: string, field: string, value: string | number){
        
        // Ejemplo: "Usuario con correo 'nico@mail.com' ya existe"
        super(`${resource} con ${field} '${value}' ya existe`)
        this.name = ElementConflictException.name
    }    
}
