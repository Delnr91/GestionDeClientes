import Customer from "./Customer";

// Define la URL base de la API, obteniéndola de las variables de entorno o usando un valor predeterminado.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/"; 

/**
 * Función asíncrona para obtener la lista de clientes desde la API.
 * @returns {Promise<Customer[]>} Una promesa que resuelve a un array de objetos Customer.
 */
export async function searchCustomers(): Promise<Customer[]> {
  try {
    // Realiza una petición GET a la API para obtener todos los clientes.
    const response = await fetch(`${API_URL}customers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa (código de estado 2xx).
    if (!response.ok) throw new Error("Error al obtener los clientes");

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
    // Retorna un array vacío en caso de error para evitar que la aplicación falle.
    return [];
  }
}

/**
 * Función asíncrona para eliminar un cliente por su ID.
 * @param {string} id El ID del cliente a eliminar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el cliente ha sido eliminado.
 */
export async function removeCustomer(id: number): Promise<void> {
  try {
    // Realiza una petición DELETE a la API para eliminar el cliente con el ID especificado.
    const response = await fetch(`${API_URL}customers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al eliminar el cliente");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para guardar un nuevo cliente o actualizar uno existente.
 * @param {Customer} customer El objeto Customer a guardar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el cliente ha sido guardado.
 */
export async function saveCustomer(customer: Customer): Promise<void> {
  try {
    // Realiza una petición POST a la API para guardar el cliente.
    const response = await fetch(`${API_URL}customers`, {
      method: "POST",
      body: JSON.stringify(customer), // Convierte el objeto Customer a JSON.
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al guardar el cliente");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para obtener un cliente por su ID.
 * @param {number} id El ID del cliente a buscar.
 * @returns {Promise<Customer | null>} Una promesa que resuelve al objeto Customer o null si no se encuentra.
 */
export async function searchCustomerById(id: number): Promise<Customer | null> {
  try {
    // Realiza una petición GET a la API para obtener el cliente con el ID especificado.
    const response = await fetch(`${API_URL}customers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) {
      // Maneja el caso específico de "no encontrado" (código de estado 404).
      if (response.status === 404) {
        console.warn(`Cliente con ID ${id} no encontrado.`);
        // Retorna null en lugar de generar un error para indicar que el cliente no existe.
        return null; 
      }
      // Lanza un error genérico para otros códigos de estado no exitosos.
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error("Error al obtener el cliente:", error);
    // Retorna null en caso de error para evitar que la aplicación falle.
    return null;
  }
}