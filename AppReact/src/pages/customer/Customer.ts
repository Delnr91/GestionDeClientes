export default interface Customer {
    id?: number; // El ID es numérico en el backend
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    address?: string;
  }

  