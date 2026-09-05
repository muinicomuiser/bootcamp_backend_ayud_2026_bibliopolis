export class ServiceError extends Error {}


export class ElementNotFoundError extends ServiceError {
    constructor(id: number | string) {
        super(`No existe el elemento con el id: ${id}`);
        this.name = this.constructor.name;
    }
} 

export class ElementAlreadyExistsError extends ServiceError {
    constructor(id: number | string) {
        super(`El elemento con el id: ${id} ya existe`);
        this.name = this.constructor.name;
    }
}