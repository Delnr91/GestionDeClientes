import Supplier from "./Supplier";

// Define la URL base de la API, obteniéndola de las variables de entorno o usando un valor predeterminado.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/"; 

/**
 * Función asíncrona para obtener la lista de proveedors desde la API.
 * @returns {Promise<Supplier[]>} Una promesa que resuelve a un array de objetos Supplier.
 */
export async function searchSuppliers(): Promise<Supplier[]> {
  try {
    // Realiza una petición GET a la API para obtener todos los proveedores.
    const response = await fetch(`${API_URL}suppliers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa (código de estado 2xx).
    if (!response.ok) throw new Error("Error al obtener los proveedors");

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
 * Función asíncrona para eliminar un proveedor por su ID.
 * @param {string} id El ID del proveedor a eliminar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el proveedor ha sido eliminado.
 */
export async function removeSupplier(id: number): Promise<void> {
  try {
    // Realiza una petición DELETE a la API para eliminar el proveedor con el ID especificado.
    const response = await fetch(`${API_URL}suppliers/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al eliminar el proveedor");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para guardar un nuevo proveedor o actualizar uno existente.
 * @param {Supplier} supplier El objeto Supplier a guardar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el proveedor ha sido guardado.
 */
export async function saveSupplier(supplier: Supplier): Promise<void> {
  try {
    // Realiza una petición POST a la API para guardar el proveedor.
    const response = await fetch(`${API_URL}suppliers`, {
      method: "POST",
      body: JSON.stringify(supplier), // Convierte el objeto Supplier a JSON.
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al guardar el proveedor");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para obtener un proveedor por su ID.
 * @param {number} id El ID del proveedor a buscar.
 * @returns {Promise<Supplier | null>} Una promesa que resuelve al objeto Supplier o null si no se encuentra.
 */
export async function searchSupplierById(id: number): Promise<Supplier | null> {
  try {
    // Realiza una petición GET a la API para obtener el proveedor con el ID especificado.
    const response = await fetch(`${API_URL}suppliers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) {
      // Maneja el caso específico de "no encontrado" (código de estado 404).
      if (response.status === 404) {
        console.warn(`Cliente con ID ${id} no encontrado.`);
        // Retorna null en lugar de generar un error para indicar que el proveedor no existe.
        return null; 
      }
      // Lanza un error genérico para otros códigos de estado no exitosos.
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error("Error al obtener el proveedor:", error);
    // Retorna null en caso de error para evitar que la aplicación falle.
    return null;
  }
}