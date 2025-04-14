export default interface Employee {
    
    id?: number; 
    firstname: string;
    lastname: string;
    email: string;
    phone?: string; // El teléfono es opcional
    address?: string; // La dirección es opcional
    salary?: number; // El salario es opcional
}